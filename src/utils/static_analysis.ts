export const static_analysis = function (nada_code: String) {
  return `
import js
from js import document
from pyodide.ffi import create_proxy, to_js
import types
import json
import ast
import inspect
import asttokens
from nada_audit import *

# print("The funcs: ", dir(js))

def analyse():
    messages = []
    inputs = {}
    outputs = []

    source = (
        """${nada_code}"""
        .replace('&' + 'amp;', '&')
        .replace('&' + 'lt;', '<')
        .replace('&' + 'gt;', '>')
    )

    # Perform static analyses and render the report.
    try:
        messages.append(['Information', 'Auditing.'])
        lines = source.split('\\n')
        report = audit(source)
        rlines = report.render().split('\\n')
        js.reportDisplay(to_js(rlines))
        print("func", js.reportDisplay)

        messages.append(['Success', 'Auditing step completed.'])
    except Exception as e:
        print("error: ", str(e))
        messages.append(['Error', type(e).__name__ + ": " + str(e)])

    # Perform abstract interpretation to determine inputs
    # and then simulate the program on the inputs (either
    # randomly generated or user-supplied).
    try:
        messages.append(['Information', 'Executing.'])
        ins = js.interpreterInputsRetrieve().to_py()

        print("The inputs of prog: ", ins)

        context = {}
        Abstract.initialize({k: v for (k, [v, _]) in ins.items()})
        exec(source, context)
        outs = context['nada_main']()

        if len(outs) > 0:
            inputs = js.interpreterInputsShow(
                to_js([[i.name, i.ty_str] for i in outs[0].inputs])
            ).to_py()

            print("inside try: ", inputs)

            outputs = js.interpreterOutputsShow(
                to_js([[o.name, o.value.value] for o in outs[0].outputs])
            ).to_py()
            

        messages.append(['Success', 'Execution completed.'])
    except Exception as e:
        print("The error has occured: ", str(e))
        messages.append(['Error', type(e).__name__ + ": " + str(e)])
    
    result = json.dumps({'messages': messages, 'inputs': inputs, 'output': outputs})
    print("final result: ", result)
    return result
analyse()
`;
};
