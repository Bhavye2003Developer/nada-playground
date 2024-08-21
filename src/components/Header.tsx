import useGlobals from "../stores/useGlobals";

function Header() {
  const runBtnClicked = useGlobals((state) => state.runBtnClicked);

  return (
    <div className="flex">
      <button onClick={() => runBtnClicked()}>RUN</button>
    </div>
  );
}

export default Header;
