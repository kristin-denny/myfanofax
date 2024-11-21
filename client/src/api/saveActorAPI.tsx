import Auth from '../auth/AuthService';

export default async function saveActor(actor: any) {

    //create a new actor obj for backend
    const actorObj = {
      actorName: actor.actorName,
      movies: actor.movies.join(""), // Convert array to a string
      comments: "comment", // No comments for now - need to add comments feature
      headshotURL: actor.headshotURL,
      userId: localStorage.getItem("userId") || "0" 
    };



  try {
    const response = await fetch('/api/actors/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(actorObj),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Information not retrieved, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error storing actor to users favorites:', err);
    return Promise.reject('Error storing actor to users favorites');
  }
  
  }