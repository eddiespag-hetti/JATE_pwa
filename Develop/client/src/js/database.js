import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

// Accepts & Posts to DB
export const putDb = async (content) => {
  console.log("Posted to the db");

  // This creates a connection to the database, and specifies the version you wish to use.
  const jateDb = await openDB("jate", 1);
  // This creates a new transaction, and specifies the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");
  // Opens the desired object store.
  const store = tx.objectStore("jate");
  // The .add() method will pass in the content.
  const request = store.add({ id: 1, value: content });
  // Await the confirmation of the request.
  const result = await request;
  console.log("Successfully saved to the database", result.jate);

  if (err) {
    console.error("putDb not implemented");
  }
};

// TODO: Add logic for a method that gets all the content from the database
// Gets all the content from the DB
export const getDb = async () => { 
  // Creates a connection to the db and specifies version.
  const jateDb = await openDB("jate", 1);
  // Creates a new transaction, and specifies the db and data privileges allowed.
  const tx = jateDb.transaction("jate", "readonly");
  // Opens object store.
  const store = tx.objectStore("jate");
  // getAll() retrieves all the content from db.
  const request = store.getAll(1);
  // Await the confirmation of the request.
  const result = await request;
  if (result.length > 0) {
    console.log('result.value', result.jate);
    return result.jate;
  } else {
    console.log('Error! getDb was not implemented');
  }
  
}

// Calls the init 
initdb();
  
  
  
  





