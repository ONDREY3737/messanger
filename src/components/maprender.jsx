import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AllChats() {
    const navigate = useNavigate();
    if (localStorage.getItem("chats") !== null) {
        console.log(localStorage.getItem("chats"))
        let chats = localStorage.getItem("chats").split(',')
        return (
            chats.map((value) => {
                return(
                    <div onClick={() => {
                        localStorage.setItem("currentChat", value)
                        console.log(localStorage.getItem("currentChat"))
                        navigate('chat')
                        navigate(0)
                    }}>
                        <p className='sessions'>Айди сессии: {value}</p>
                    </div>
                )
            })
        )
    }
    
}
