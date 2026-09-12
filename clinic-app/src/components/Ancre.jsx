function Ancre({ href, action, setAction }) {
    return (
        <>
            <a href={href} className="a-field" onClick={() => setAction(action === "Se connecter" ? "S'inscrire" : "Se connecter")}>{action}</a>
        </>
    );
}

export default Ancre;