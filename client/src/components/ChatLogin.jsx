function ChatLogin() {
    return(
        <>
            <div>
                <h1>Chatnonymous</h1>
            </div>
            <div>
                <h3>Please sign in</h3>
            </div>
            <div>
                <form className="loginForm">
                    <input type="text"></input>
                    <input type="password"></input>
                    <button>Submit</button>
                </form>
            </div>
        </>
    );
}

export default ChatLogin;