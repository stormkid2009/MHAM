import Layout from "../components/layout";
import Image from "next/image";
import styles from '../styles/Home.module.css';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data:session} = useSession();
  const router = useRouter();
  
  const handleAddUnit=(e)=>{
    e.preventDefault();
    if(!session){
      router.push('/accessDenied')
    }
    router.push('/units/add')
  }

  const handleSearch =(e)=>{
    e.preventDefault();
    router.push('/units')
  }
  return (
    
      <Layout >
        <div className="flex-grow flex flex-col items-center  py-4">
          <div className="flex-1">
            <h1 className="py-2 px-1 text-white bg-blue-500 rounded-lg">&& MHAM DASHBOARD &&</h1>
          </div>
          <div>
            {session && <h2>current user : {session.user.name}</h2>}
          </div>
          <div className="flex-1 py-4">
            <Image src="https://drive.google.com/uc?id=1qT9Qj_tZuUfJtHsdN-afn187iZ6kZV0U" alt="mham pic" height={500} width={500} />
          </div>
          <div className="flex justify-between bg-transparent">
            <button className={styles.btn} onClick={handleAddUnit}>Add New Unit</button>
            <button className={styles.btn} onClick={handleSearch}>Search Exisiting Units</button>
          </div>
        </div>
      </Layout>
    
  );
}
