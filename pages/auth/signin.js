import {signIn, getCsrfToken, getProviders, useSession} from 'next-auth/react'
import Image from 'next/image'
import styles from '../../styles/Signin.module.css'
import {useRouter} from "next/router";
import Loader from '@/components/loader';

const Signin = ({ providers }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <Loader />;
    }
    if (session) {
        router.push('/');
        return null;
    }

    return (
        <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div className={styles.wrapper} />
            <div className={styles.content}>
                <div className={styles.cardWrapper}>
                    <Image src='/toastmasters-international-logo-vector.svg' width="1000" height="400" alt='App Logo' style={{ height: '200px', marginBottom: '10px' }} />
                    <div className={styles.cardContent}>
                        <div>{"UUM Assets Declaration"}</div>
                        <hr/>
                        {providers &&
                            Object.values(providers).map(provider => (
                                <div key={provider.name} style={{ marginBottom: 0 }}>
                                    <button className={styles.signin} onClick={() => signIn(provider.id)} >
                                        Sign in with{' '} {provider.name}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/login_pattern.svg' alt='Pattern Background' className={styles.styledPattern} />
        </div>
    )
}

export default Signin

export async function getServerSideProps(context) {
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    return {
        props: {
            providers,
            csrfToken
        },
    }
}
