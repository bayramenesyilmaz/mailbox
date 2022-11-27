import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();

    const [count, setCount] = useState();

    const user = JSON.parse(localStorage.getItem("login-user"));
    let id;
    if(user){
        id = user.id
    }


    function handleLogut() {
        localStorage.removeItem("login-user");
        navigate("/");
    }

    useEffect(() => {
        async function getData() {
            const response = await axios(`/api/${id}/messages`);
            const newCount = response.data.filter(item => {
                if (!item.isRead) {
                    return item
                }
            })

            setCount(newCount.length);
        }
        getData();
    }, [id])


    return (
        <>
            <nav>
                <h1>MailBox</h1>

                {
                    !user ?
                        <ul>
                            <Link className='router-link' to="/"> <li>Anasayfa</li> </Link>
                        </ul>
                        :
                        <ul>
                            <li className='position-relative bg-light p-2 rounded-1'>
                                {user.email}
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                    {count}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </li>
                            <li>
                                <button onClick={handleLogut} className='btn btn-danger'>Logout</button>
                            </li>
                        </ul>
                }
            </nav>

            <section>

                <div className="messages-container d-flex flex-column justify-content-center align-items-center ">

                    {
                        location.pathname.includes("detail") ?
                            <h1>Messages Detail</h1>
                            : location.pathname.includes("messages") ?
                                <h1>Messages</h1>
                                : <h1>MailBox</h1>
                    }


                    <Outlet />

                </div>

            </section>

            <footer>
                Footer
            </footer>
        </>
    )
}

export default Layout