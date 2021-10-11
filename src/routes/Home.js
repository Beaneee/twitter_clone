import React, { useEffect, useState } from 'react';
import { dbService } from "../firebase";
import { addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import Nweet from '../components/Nweet';

function Home({ userobj }) {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // const getNweets = async () => {
    //     const q = query(collection(dbService, "nweets"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         const nweetObj = {
    //         ...doc.data(),
    //         id: doc.id,
    //         }
    //         setNweets(prev => [nweetObj, ...prev]);
    //     });
    // };

    useEffect(() => {
        const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
            onSnapshot(q, (snapshot) => {
                const nweetArr = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNweets(nweetArr);
            });
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text:nweet,
                createdAt: Date.now(),
                creatorId: userobj.uid,
            });
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
        setNweet("");
    };

    const onChange = (e) => {
        const {
            target: {value},
        } = e;
        setNweet(value);
    };


    return (
        <div>
            <form action="">
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet" onClick={onSubmit} />
            </form>
            <div>
                {nweets.map(nweet => 
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userobj.uid }/>
                    )}
            </div>
        </div>
    );
}

export default Home;