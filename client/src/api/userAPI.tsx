export interface UserInfo {
  username: string | null;
  password: string | null;
}


export default async function createUser(userInfo: UserInfo) {

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('username already exists');
    }

    return data;

  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }

}
