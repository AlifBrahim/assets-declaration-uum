import React from 'react'
import DummyPage from '@/components/DummyPage'
import Layout from '@/components/Layout';

export default function AssetsDeclarationPage() {
    return (
        <Layout
            pageTitle='Assets Declaration'
        >
            <div className="min-h-screen flex flex-col">
                <div className="m-auto">
                    <h1 className="text-4xl">Hola</h1>
                    <Image src="https://drive.google.com/file/d/1AM-oiCqId7K1VIEAVjxdjQbOuFLYzTn4/view?usp=sharing" alt="" onLoad={() => setIsImageLoading(false)} />
                </div>
            </div>
        </Layout>
    )
}
