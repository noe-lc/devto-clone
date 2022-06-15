import Image from 'next/image';

export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <div>
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            textAlign: 'center',
            width: '75px',
            height: '75px',
          }}
        >
          <Image
            src={user.photoURL || '/hacker.png'}
            alt="User image"
            className="card-img-center"
            layout="fill"
          />
        </div>
      </div>
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
  );
}
