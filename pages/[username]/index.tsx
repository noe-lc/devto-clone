import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';

import { getUserWithUserName, postToJson } from '../../lib/firebase';

export async function getServerSideProps({ query: reqQuery }) {
  const { username } = reqQuery;
  const userDoc = await getUserWithUserName(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc.exists()) {
    user = userDoc.data();
    const postsQuery = query(
      collection(userDoc.ref, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    posts = (await getDocs(postsQuery)).docs;
    posts = posts.map(postToJson);
  }

  return {
    props: { user, posts },
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed admin={false} posts={posts} />
    </main>
  );
}
