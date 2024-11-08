// createData.js
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://nisha971943:Ashi%401234@nishayadav.ut56rhi.mongodb.net/"; // Change if using a remote DB or different port
const dbName = "abes_db"; // Replace with your desired database name

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    // 1. Create and Insert into `branches` Collection
    const branchesCollection = db.collection("branches");
    await branchesCollection.insertMany([
      { name: "Computer Science" },
      { name: "Mechanical Engineering" },
      { name: "Electrical Engineering" },
      { name: "Civil Engineering" }
    ]);
    console.log("Inserted branches data");

    // 2. Create and Insert into `years` Collection
    const yearsCollection = db.collection("years");
    await yearsCollection.insertMany([
      { name: "1st Year" },
      { name: "2nd Year" },
      { name: "3rd Year" },
      { name: "4th Year" }
    ]);
    console.log("Inserted years data");

    // 3. Create and Insert into `subjects` Collection
    const subjectsCollection = db.collection("subjects");
    const branches = await branchesCollection.find().toArray(); // Fetch branch data
    const years = await yearsCollection.find().toArray(); // Fetch year data

    await subjectsCollection.insertMany([
      {
        name: "Mathematics",
        branch: ObjectId(branches[0]._id),  // Assuming Computer Science is at index 0
        year: ObjectId(years[0]._id)         // Assuming 1st Year is at index 0
      },
      {
        name: "Physics",
        branch: ObjectId(branches[0]._id),
        year: ObjectId(years[0]._id)
      },
      {
        name: "Data Structures",
        branch: ObjectId(branches[0]._id),
        year: ObjectId(years[1]._id)         // Assuming 2nd Year is at index 1
      }
    ]);
    console.log("Inserted subjects data");

    // 4. Create and Insert into `teachers` Collection
    const teachersCollection = db.collection("teachers");
    await teachersCollection.insertMany([
      { name: "Dr. John Doe" },
      { name: "Dr. Jane Smith" },
      { name: "Prof. Alan Turing" },
      { name: "Prof. Ada Lovelace" }
    ]);
    console.log("Inserted teachers data");

    // 5. Create and Insert into `classrooms` Collection
    const classroomsCollection = db.collection("classrooms");
    await classroomsCollection.insertMany([
      { roomNumber: "101" },
      { roomNumber: "102" },
      { roomNumber: "203" },
      { roomNumber: "204" }
    ]);
    console.log("Inserted classrooms data");

    // 6. Create and Insert into `timetables` Collection
    const timetablesCollection = db.collection("timetables");

    const subjects = await subjectsCollection.find().toArray(); // Fetch subject data
    const teachers = await teachersCollection.find().toArray(); // Fetch teacher data
    const classrooms = await classroomsCollection.find().toArray(); // Fetch classroom data

    await timetablesCollection.insertMany([
      {
        branch: ObjectId(branches[0]._id), // Computer Science
        year: ObjectId(years[0]._id),      // 1st Year
        day: "Monday",
        startTime: "09:00",
        endTime: "10:30",
        subject: ObjectId(subjects[0]._id), // Mathematics
        teacher: ObjectId(teachers[0]._id), // Dr. John Doe
        classroom: ObjectId(classrooms[0]._id) // Room 101
      },
      {
        branch: ObjectId(branches[0]._id),
        year: ObjectId(years[1]._id),      // 2nd Year
        day: "Monday",
        startTime: "10:45",
        endTime: "12:15",
        subject: ObjectId(subjects[2]._id), // Data Structures
        teacher: ObjectId(teachers[1]._id), // Dr. Jane Smith
        classroom: ObjectId(classrooms[1]._id) // Room 102
      }
    ]);
    console.log("Inserted timetables data");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
