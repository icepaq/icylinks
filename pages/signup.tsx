import styles from '../styles/Signup.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Login = () => {

    const router = useRouter();

    const submit = async () => {
        const email = (document.getElementById('email') as HTMLInputElement).value
        const password = (document.getElementById('password') as HTMLInputElement).value
        const repeatpassword = (document.getElementById('repeatpassword') as HTMLInputElement).value
        const name = (document.getElementById('name') as HTMLInputElement).value

        if (password !== repeatpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            })
            return
        }

        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);
        params.append('name', name);

        const r = await fetch('/api/auth/signup', {method: 'POST', body: params}).then(res => res.json());

        Cookies.set('token', r.token);
        Cookies.set('email', email);

        router.push('/login');
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            Signup
                        </div>

                        <div className={styles.form}>
                            <input className={styles.formItem} type="text" placeholder="Name" id='name'/>
                            <input className={styles.formItem} type="text" placeholder="Email" id='email'/>
                            <input className={styles.formItem} type="password" placeholder="Password" id='password' />
                            <input className={styles.formItem} type="password" placeholder="Repeat Password" id='repeatpassword' />

                            <div className={styles.button} onClick={submit}>
                                Signup
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;