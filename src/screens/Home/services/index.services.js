import { useEffect, useRef, useState } from "react"
import { getBooks, getUserData } from "../../../api/apiCall";
import { strings } from "../../../helpers/Localization";
import ScreenNames from "../../../helpers/ScreenNames";
import { showToast } from '../../../helpers/Utils'

const HomeServiceComponent = ({ children, navigation }) => {

    /**s
     * UI States
     */
    const [reload, setReload] = useState(0)
    const [booksData, setBooksData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [userPassword, setUserPassword] = useState('')
    const [userPasswordEntered, setUserPasswordEntered] = useState('')
    const [userPasswordCount, setUserPasswordCount] = useState(0)
    const bottomRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            getBooksAPI()
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const btnActionUploadFile = () => {

        if (userPasswordCount > 5) {
            bottomRef.current.open()
        } else {
            setUserPasswordCount(userPasswordCount + 1)
            showToast('Only Admin can Add Data!!')
        }
    }

    const getBooksAPI = async () => {
        setIsLoading(true)
        let BooksTemp = await getBooks()
        let pass = await getUserData()
        setUserPassword(pass || '1111')
        setBooksData(BooksTemp)
        setIsLoading(false)
    }


    const onPressCellItem = (item) => {
        navigation.navigate(ScreenNames.ReaderScreen, { data: item })

    }




    return children({
        navigation,
        booksData,
        isLoading,
        bottomRef,
        userPasswordEntered,
        userPassword,
        userPasswordCount,
        setUserPasswordCount,
        setUserPasswordEntered,
        btnActionUploadFile,
        onPressCellItem,
    });

}

export default HomeServiceComponent