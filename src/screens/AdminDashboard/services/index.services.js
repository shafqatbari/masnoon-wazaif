import { useEffect, useRef, useState } from "react"
import { strings } from "../../../helpers/Localization";
import ScreenNames from "../../../helpers/ScreenNames";
import storage from "@react-native-firebase/storage";
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from "react-native-document-picker";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import RNFetchBlob from 'rn-fetch-blob'
import { showToast } from '../../../helpers/Utils'
const AdminDashboardServiceComponent = ({ children, navigation, route }) => {

    /**s
     * UI States
     */
    const { booksData } = route.params
    const [reload, setReload] = useState(0)
    const [filePath, setFilePath] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [booksDataList, setBooksDataList] = useState(booksData)
    const [process, setProcess] = useState("");
    var isReadGranted

    useEffect(() => {

        setBooksDataList(booksData)
    }, [])

    const btnActionLogout = () => {
        showToast("You logout from Admin panel Successfully!")
        navigation.navigate(ScreenNames.Home)
    }

    const btnActionUploadFile = async () => {
        navigation.navigate(ScreenNames.UploadFile)

    };

    const RemoveFromFireBaseFunc = async (item) => {
        setLoading(true)
        console.log('>>> Remove Press ', item);
        // var desertRef = storage().child(`myfiles/${item.name}`);
        let imageRef = storage().refFromURL(decodeURI(item.fileUrl));
        imageRef.delete().then(() => {
            // File deleted successfullys
            console.log('>>> Removed');
            firestore().collection("Books").doc(item.fileName).delete().then(() => {
                let booksDataListTemp = booksDataList.filter((ditem) => ditem.name !== item.name)
                setBooksDataList(booksDataListTemp)
                setReload(reload + 1)
                console.log("Document successfully deleted!");
                setLoading(false)
            }).catch((error) => {
                console.error("Error removing document: ", error);
                setLoading(false)
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!

            setLoading(false)
            console.log('>>> error ', error);
        });
        // Delete the file
        // desertRef.delete().then(() => {
        //     // File deleted successfully
        //     console.log('>>> Removed');
        // }).catch((error) => {
        //     // Uh-oh, an error occurred!
        //     console.log('>>> error ', error);
        // });
    }
    const btnActionRemoveBook = async (item) => {
        Alert.alert(
            'Are you sure you want to delete?',
            item.name,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Yes', onPress: () => {
                        console.log('OK Pressed')
                        RemoveFromFireBaseFunc(item)
                    }
                },
            ],
            { cancelable: false }
        )

    };

    return children({
        navigation,
        isLoading,
        filePath,
        booksDataList,
        isLoading,
        btnActionUploadFile,
        btnActionRemoveBook,
        btnActionLogout,
    });

}

export default AdminDashboardServiceComponent