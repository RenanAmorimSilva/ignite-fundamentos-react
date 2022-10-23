import { Header } from './components/Header';
import { Post } from './components/Post';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';

import './global.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl:'https://www.github.com/RenanAmorimSilva.png',
      name: 'Renan Amorim',
      role: 'Web developer'
    },
    content: [
       { type: 'paragraph', content: 'Fala galeraa 👋'},
       { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
       { type: 'link', content: '👉jane.design/doctorcare'},                  
    ],
    publishedAt: new Date('2022-09-24 10:27:30'),
  },
  {
    id: 2,
    author: {
      avatarUrl:'https://www.github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @rockteseat'
    },
    content: [
       { type: 'paragraph', content: 'Fala galeraa 👋'},
       { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
       { type: 'paragraph', content: '👉jane.design/doctorcare'},                  
    ],
    publishedAt: new Date('2022-09-24 11:27:30'),
  },
];

export function App() {
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return(
              <Post 
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
         
        </main>  
      </div>
    </div>
  )
}

