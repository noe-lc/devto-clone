import { useDocumentData } from 'react-firebase-hooks/firestore';
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  limit,
  query,
  where,
} from '@firebase/firestore';

import PostContent from '../../components/PostContent';
import { firestore, getUserWithUserName, postToJson } from '../../lib/firebase';

import styles from '../../styles/Post.module.css';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUserName(username);

  let post;
  let path;

  if (userDoc) {
    const postsCollection = collection(userDoc.ref, 'posts');
    const postQuery = query(
      postsCollection,
      where('slug', '==', slug),
      limit(1)
    );

    [post] = (await getDocs(postQuery)).docs;
    post = postToJson(post);
    path = `${postsCollection.path}/${post.uid}`;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  let postsQuery = await collectionGroup(firestore, 'posts');
  postsQuery = query(postsQuery);

  const snapshot = await getDocs(postsQuery);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}

export default function Post(props) {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
  );
}
