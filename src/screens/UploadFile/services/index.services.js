import { useEffect, useRef, useState } from "react"
import { strings } from "../../../helpers/Localization";
import ScreenNames from "../../../helpers/ScreenNames";
import storage, { firebase } from "@react-native-firebase/storage";
import DocumentPicker from "react-native-document-picker";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import RNFetchBlob from 'rn-fetch-blob'
import { uploadBookDeatilsFireStore } from "../../../api/apiCall";
import { showToast } from "../../../helpers/Utils";
const UploadFileServiceComponent = ({ children, navigation }) => {

    /**s
     * UI States
     */
    const [reload, setReload] = useState(0)
    const [filePath, setFilePath] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [process, setProcess] = useState("");
    var isReadGranted

    const getPathForFirebaseStorage = async (uri) => {
        if (Platform.OS === 'ios') {
            return uri
        }

        const stat = await RNFetchBlob.fs.stat(uri)
            .then((res) => {
                return res
            }).catch((err) => {
                console.log('>>>> errror fetching ', err);
            })
        return stat ? stat.path : uri
    }
    const uploadImage = async (uri, name, firebasePath) => {
        const documentUri = await getPathForFirebaseStorage(uri)
        // var documentUri = decodeURIComponent(uri)
        // console.log(">>> documentUri ", documentUri);
        const imageRef = storage().ref(`${firebasePath}/${name.split(" ").join("_N_")}`)
        var url = ''
        await imageRef.putFile(documentUri).then(async (res) => {



            setProcess("");
        }
        ).catch((error) => {
            console.log('>>> Upload Error error11 ', error);
        })
        // task.on("state_changed", (taskSnapshot) => {
        //     setProcess(
        //         `${taskSnapshot.bytesTransferred} transferred 
        //            out of ${taskSnapshot.totalBytes}`
        //     );
        //     console.log(
        //         `${taskSnapshot.bytesTransferred} transferred 
        //            out of ${taskSnapshot.totalBytes}`
        //     );
        // });
        // await task.then(async (res) => {
        //     alert("Image uploaded to the bucket!");
        //     console.log('>>>> Repsonse Upload ', res);

        //     setProcess("");
        // }
        // ).catch((error) => {
        //     console.log('>>> Upload Error error11 ', error);
        // })
        url = await imageRef.getDownloadURL().catch((error) => { throw error });
        console.log('>>> zzv URL', url);
        let date = new Date()
        let bookDeatils = {
            date: date.toString(),
            name: name.split("_N_").join(" "),
            fileName: name.split(" ").join("_N_"),
            fileUrl: url
        }
        await uploadBookDeatilsFireStore(bookDeatils).then(() => {

        }).catch((err) => {
            console.log('>>> books deatils error', err);
        })
    }
    const btnActionUploadFile = async () => {
        var task = ''
        if (Platform.OS === 'android') {
            isReadGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
        }
        if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {


            try {
                // Check if file selected

                if (Object.keys(filePath).length == 0)
                    return alert("Please Select any File");
                setLoading(true);

                // console.log('>> Comes here  22');
                // Create Reference
                // console.log(filePath.uri.replace("file://", ""));
                console.log(filePath.name);
                await uploadImage(filePath.uri.replace("file://", ""), filePath.name, '/myfiles/')
                setLoading(false);
                // Alert.alert("Alert", "File uploaded to the bucket!");
                showToast('File uploaded to the bucket!')
                navigation.navigate(ScreenNames.Home)


                // const reference = storage().ref(
                //     `/myfiles/${filePath.name}`
                // );

                console.log('>> Comes here 33',);
                // const documentUri = await getPathForFirebaseStorage(filePath.uri)
                // const storageRef = storage().ref()
                // await storageRef
                //     .child('/documents/' + filePath.name)
                //     .putFile(documentUri).then((snapshot) => {
                //         console.log('has been successfully uploaded.');
                //     }).catch((e) => console.log('uploading image error => ', e));

                console.log('>> Comes here 44');
                // You can do different operation with task
                // task.pause();
                // task.resume();
                // task.cancel();

                //     task.on("state_changed", (taskSnapshot) => {
                //         setProcess(
                //             `${taskSnapshot.bytesTransferred} transferred 
                //    out of ${taskSnapshot.totalBytes}`
                //         );
                //         console.log(
                //             `${taskSnapshot.bytesTransferred} transferred 
                //    out of ${taskSnapshot.totalBytes}`
                //         );
                //     });
                //     task.then(async (res) => {
                //         alert("Image uploaded to the bucket!");
                //         console.log('>>>> Repsonse Upload ', res);
                //         const url = await task.getDownloadURL().catch((error) => { throw error });
                //         console.log('>>>> Repsonse Upload  URl ', url);
                //         setProcess("");
                //     }
                //     ).catch((error) => {
                //         console.log('>>> Upload Error error11 ', error);
                //     })


            } catch (error) {
                console.log("Error->", error);
                alert(`Error-> ${error}`);
            }
            setFilePath({});
        }
        setLoading(false);
    };

    const btnActionSelectFile = async () => {
        // Opening Document Picker to select one file
        try {
            const fileDetails = await DocumentPicker.pick({
                // Provide which type of file you want user to pick
                type: [DocumentPicker.types.pdf],
            });
            console.log(
                "fileDetails : " + JSON.stringify(fileDetails)
            );
            // Setting the state for selected File
            setFilePath(fileDetails[0]);
        } catch (error) {
            setFilePath({});
            // If user canceled the document selection
            alert(
                DocumentPicker.isCancel(error)
                    ? "Canceled"
                    : "Unknown Error: " + JSON.stringify(error)
            );
        }
    };

    return children({
        navigation,
        isLoading,
        filePath,
        btnActionUploadFile,
        btnActionSelectFile,
    });

}

export default UploadFileServiceComponent