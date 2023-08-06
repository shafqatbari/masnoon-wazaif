
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';

export const uploadBookDeatilsFireStore = async (bodyTemp) => {
  let body = bodyTemp
  body.fileName = body.name.split(" ").join("_N_")
  await firestore()
    .collection('Books')
    .doc(body.fileName)
    .set(body)
    .then(() => {
      console.log('Book Details added!');
    });
}

export const getBooks = async () => {
  var booksData = await firestore().collection('Books').get();
  booksData = booksData._docs
  booksData = booksData.map((item) => item._data)
  console.log('>>> booksData ', booksData);
  // let ordersFuelData = ordersFuel._data
  // [
  // "UNIQUE ID",
  // ]

  // ordersFuelData = ordersFuelData && ordersFuelData.length > 0 ? [...ordersFuelData, body] : [body]

  // console.log('>>> Come JHere 33', ordersFuelData);
  return booksData;

}
export const getUserData = async () => {
  var passwordData = await firestore().collection('User').doc('Password').get();
  passwordData = passwordData._data || '1111'
  passwordData = passwordData.password || '1111'
  console.log('>>> passwordData ', passwordData);

  return passwordData;

}



export const emptyBookMarks = async (id) => {
  try {
    await AsyncStorage.setItem(id, '')
  } catch (e) {
    // saving error
    console.log('>>> saving error : ', e);
  }
}
export const saveBookMarks = async (id, body) => {
  var bodyData = JSON.stringify(body)
  try {
    await AsyncStorage.setItem(id, bodyData)
    console.log('>> Book Mark added');
  } catch (e) {
    // saving error
    console.log('>>> saving error : ', e);
  }
}
export const readBookMarks = async (id) => {
  console.log('>>> id', id);
  try {
    var value = await AsyncStorage.getItem(id)
    value = value ? JSON.parse(value) : []
    console.log('>>> Bookmarks', value);
    return value
  } catch (e) {
    // error reading value
    console.log('>>> error reading value : ', e);
  }
}


export const uploadBookMarks = async (body) => {
  await firestore()
    .collection('Bookmarks')
    .doc(body.date)
    .set(body)
    .then(() => {
      console.log('Book Details added!');
    });
}

export const getBookMarks = async () => {
  var booksData = await firestore().collection('Bookmarks').get();
  booksData = booksData._docs
  booksData = booksData.map((item) => item._data)
  console.log('>>> books Marks ', booksData);
  // let ordersFuelData = ordersFuel._data
  // [
  // "UNIQUE ID",
  // ]

  // ordersFuelData = ordersFuelData && ordersFuelData.length > 0 ? [...ordersFuelData, body] : [body]

  // console.log('>>> Come JHere 33', ordersFuelData);
  return booksData;

}