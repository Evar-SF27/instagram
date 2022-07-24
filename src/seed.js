import { addDoc, collection } from "firebase/firestore";
import { db } from "./lib/firebase.prod";

export function seedDatabase() {
    const userCollectionRef = collection(db, 'users');
    const photoCollectionRef = collection(db, 'photos');
    const users = [
      {
        userId: 'PDwTTJoFUQQ9renFe45vLGz19Sv1',
        username: 'karl',
        fullName: 'Karl Hadwen',
        emailAddress: 'karlhadwen@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'raphael',
        fullName: 'Raffaello Sanzio da Urbino',
        emailAddress: 'raphael@sanzio.com',
        following: [],
        followers: ['PDwTTJoFUQQ9renFe45vLGz19Sv1'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['PDwTTJoFUQQ9renFe45vLGz19Sv1'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['PDwTTJoFUQQ9renFe45vLGz19Sv1'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {

      addDoc(userCollectionRef, users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
      
        addDoc(photoCollectionRef, {
            photoId: i,
            userId: '2',
            imageSrc: `/images/users/raphael/${i}.jpg`,
            caption: 'Saint George and the Dragon',
            likes: [],
            comments: [
            {
                displayName: 'dali',
                comment: 'Love this place, looks like my animal farm!'
            },
            {
                displayName: 'orwell',
                comment: 'Would you mind if I used this picture?'
            }
            ],
            userLatitude: '40.7128°',
            userLongitude: '74.0060°',
            dateCreated: Date.now()
        });
    }
  }