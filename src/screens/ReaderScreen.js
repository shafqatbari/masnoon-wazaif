import React, { useEffect, useState, useRef } from 'react';
import {
    View, SafeAreaView, Text, ActivityIndicator, Platform, StatusBar, StyleSheet,
    RefreshControl, TouchableOpacity, ScrollView, Image, FlatList, TextInput, Dimensions,
    PermissionsAndroid,
} from 'react-native';
import SvgImage from '../components/SvgImage';

import Pdf from 'react-native-pdf';
import * as Progress from 'react-native-progress';
import { BackPage, BookMark, DropDownIcon, NextPage, DeleteIcon, ViewFiles } from '../helpers/CommonImages';
import colors from '../helpers/colors';
import SimpleBottomSheet from '../components/SimpleBottomSheet'
import ModalDropdown from "react-native-modal-dropdown-with-flatlist";
import { screenWidth } from '../helpers/Constants';
import { emptyBookMarks, readBookMarks, saveBookMarks } from '../api/apiCall';
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { showToast } from '../helpers/Utils'
import ReactNativeBlobUtil from 'react-native-blob-util'
import PdfWrapper from '@tele2/react-native-pdf-wrapper';




const ReaderScreen = ({
    navigation,
    route
}) => {
    // /storage/emulated/0/Android/data/com.masnoonwazaif/files/Pictures/Report_Download1653371006359
    // https://file-examples.com/storage/feddb42d8762894ad9bbbb0/2017/10/file-example_PDF_1MB.pdf
    const { data, screendetail } = route.params
    // console.log('>> data ', data);  data.fileUrl
    const source = { uri: data.fileUrl, cache: true, expiration: 0 };
    const [totalpages, settotalpages] = useState(data.pages);
    const [noofpages, setnoofpages] = useState(data.currentPage ? data.currentPage : 0);

    // const [isMoveToPage, setIsMoveToPage] = useState(false);
    const isMoveToPage = useRef(data.currentPage ? data.currentPage : 0)
    const [scaleno, setscaleno] = useState(1);
    const [isAddBookMark, setIsAddBookMark] = useState(false)
    const [bookMarkName, setBookMarkName] = useState('')
    const [bookMarkArray, setBookMarkArray] = useState([])
    const bottomRef = useRef()
    const bottomRefPageNumber = useRef()
    const [newBookMarkName, setNewBookMarkName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [pageNumber, setPageNumber] = useState('')
    const [orientation, setOrientation] = useState('portrait')
    const [reLoad, setReLoad] = useState(0)


    useEffect(() => {
        setIsLoading(true)
        getBookMarksApi()
    }, [])
    useEffect(() => {
        setReLoad(reLoad + 1)
    }, [orientation])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            setOrientation(isPortrait() ? 'portrait' : 'landscape')
            setReLoad(reLoad + 1)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    console.log('>>> modalVisible', modalVisible);
    const getScreen = () => {
        return Dimensions.get('screen');
    }

    Dimensions.addEventListener('change', () => {
        console.log('>>> Dimension chnaged', isPortrait());
        setOrientation(isPortrait() ? 'portrait' : 'landscape')
        setReLoad(reLoad + 1)

    });
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };



    const getBookMarksApi = async () => {
        // await emptyBookMarks(data.name)
        let bookMarksTemp = await readBookMarks(data.name)
        setBookMarkArray(bookMarksTemp)
        setIsLoading(false)
    }

    const btnActionBookMarkPress = () => {
        setIsAddBookMark(false)
        bottomRef.current.open()
    }
    const btnActionBookMarkShow = () => {
        setIsAddBookMark(!isAddBookMark)
    }
    const btnActionDownloadPDF = () => {
        console.log('>>> Comes Here 11');
        const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: false,
                path: PictureDir + "/me_" + data.name,// Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
                description: 'Downloading image.'
            }
        }

        console.log('>>> Comes Here 22');
        config(options).fetch('GET', data.fileUrl).then((res) => {
            // do some magic here
            console.log('>>>> res DownLoad', res);
        }).catch((err) => {

            console.log('>>>> err DownLoad', err);
        })
    }

    const btnActionDownload = () => {
        const { config, fs } = ReactNativeBlobUtil;
        let PictureDir = fs.dirs.PictureDir;
        let date = new Date();
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                //Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/Report_Download' +
                    Math.floor(date.getTime() + date.getSeconds() / 2),
                description: 'Risk Report Download',
            },
        };
        config(options)
            .fetch('GET', data.fileUrl)
            .then((res) => {
                //Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                alert('Report Downloaded Successfully.');
            });
    }

    const downloadPermissions = () => {

        //Function to check the platform
        //If iOS the start downloading
        //If Android then ask for runtime permission
        if (Platform.OS === 'ios') {
            // btnActionDownload();
            // alert('Report Downloaded Successfully 11.');
            // ReactNativeBlobUtil.ios.openDocument(url);
            Linking.openURL(url)

        } else {
            try {
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'storage title',
                        message: 'storage_permission',
                    },
                ).then(granted => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //Once user grant the permission start downloading
                        console.log('Storage Permission Granted.');
                        btnActionDownload();
                    } else {
                        //If permission denied then show alert 'Storage Permission  Not Granted'
                        Alert.alert('storage_permission');
                    }
                });
            } catch (err) {
                //To handle permission related issue
                console.log('error', err);
            }
        }

    }
    const btnActionSaveBookMark = async () => {
        if (newBookMarkName !== '') {
            setIsLoading(true)
            let bodyData = {
                date: (new Date).toString(),
                pageNo: noofpages,
                bookName: data.name,
                name: newBookMarkName,
            }
            bodyData = [...bookMarkArray, bodyData]
            setBookMarkArray([...bookMarkArray, bodyData])
            await saveBookMarks(data.name, bodyData)
            await getBookMarksApi()
            showToast('Bookmark Added Successfully!!!')
            bottomRef.current.close()
        } else {
            showToast('Please enter bookmark name!')
        }
    }
    const btnActionBookMarkEmpty = async () => {
        if (bookMarkArray.length > 0) {
            setIsLoading(true)
            await emptyBookMarks(data.name)
            setBookMarkArray([])
            setIsLoading(false)
            bottomRef.current.close()

            showToast('Bookmarks removed succesfully!')
        } else {
            showToast('No bookmarks available!')
        }
    }
    const GropDownListing = () => {

        return (
            <View style={{
                flexDirection: 'row', marginTop: 20, borderRadius: 5,
                borderWidth: 0.5, height: 50, alignItems: 'center'
            }}>
                <ModalDropdown
                    defaultValue={bookMarkName ? bookMarkName : 'Select BookMark'}
                    options={bookMarkArray}
                    style={[{
                        flex: 1,
                        // marginRight: 40,
                        width: screenWidth - 40,
                        marginHorizontal: 5,

                    },]}

                    textStyle={[{
                        //flex: 1,
                        alignSelf: 'flex-start',
                        paddingVertical: 10,
                        paddingLeft: 10,
                        paddingRight: 30,
                        color: colors.black,
                        backgroundColor: 'transparent',
                        // backgroundColor: 'red',
                        fontSize: 22,
                        width: screenWidth * 0.75,
                        borderRadius: 5,
                        // borderWidth: 0.5


                    },]}
                    dropdownStyle={[{
                        width: screenWidth * 0.75,
                        // height: 40,
                        borderRadius: 4,
                        marginStart: 0,
                    }]}

                    renderRow={(value) =>
                        <View
                            style={{
                                width: '100%',
                                backgroundColor: colors.white,
                                justifyContent: 'center',
                                borderBottomWidth: 1
                            }}
                            pointerEvents="none"
                        >
                            {/* <SimpleLabel
                            color={colors.lightBlack}
                            fontSizeDropDown={fontSize14}
                            backgroundColor={'transparent'}
                            fontFamily={axiLightFontFamily.fontFamily}
                            padding={10}
                            title={value.name}
                            alignSelf={'flex-start'}
                            textAlign={I18nManager.isRTL ? 'right' : 'left'}
                            marginRight={I18nManager.isRTL ? 2 : 5}
                        /> */}
                            <Text style={{ color: colors.black, fontSize: 18, paddingVertical: 5, paddingStart: 10 }} >
                                {value.name}
                            </Text>
                        </View>
                    }
                    renderButtonText={(value) =>
                        // <SimpleLabel
                        //     color={props.dropDownTextColor ? props.dropDownTextColor : colors.white}
                        //     backgroundColor={'transparent'}
                        //     fontFamily={axiLightFontFamily.fontFamily}
                        //     fontSizeDropDown={fontSize14}
                        //     title={value.name}
                        //     padding={10}
                        //     alignSelf={'flex-start'}
                        //     justifyContent={'center'}
                        //     textAlign={I18nManager.isRTL ? 'right' : 'left'}
                        //     marginRight={I18nManager.isRTL ? 2 : 5}
                        // />
                        <Text>
                            {value.name}
                        </Text>
                    }
                    onSelect={(index) => {
                        setnoofpages(bookMarkArray[index].pageNo)
                        setBookMarkName(bookMarkArray[index].name)
                        isMoveToPage.current = bookMarkArray[index].pageNo

                        // set(Array[index].name)
                    }}


                />
                <SvgImage
                    source={DropDownIcon}
                    style={{ height: 20, width: 20, marginEnd: 5 }}
                />
            </View>
        )
    }

    const renderBookMarkView = () => {

        return (
            <View style={{ flex: 1, paddingBottom: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={btnActionBookMarkEmpty}
                        style={{ paddingHorizontal: 20, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <SvgImage
                            source={DeleteIcon}
                            style={{ height: 40, width: 40, }}
                        />
                        <Text style={{ fontSize: 12, color: 'black', textAlign: 'center' }}>Remove {'\n'} Bookmarks</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={downloadPermissions}
                        style={{ paddingHorizontal: 20, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <SvgImage
                            source={ViewFiles}
                            style={{ height: 40, width: 40, }}
                        />
                        <Text style={{ fontSize: 12, color: 'black', textAlign: 'center' }}>Downlod  {'\n'} Book</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={btnActionBookMarkShow}
                        style={{ paddingHorizontal: 20, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <SvgImage
                            source={BookMark}
                            style={{ height: 40, width: 40, }}
                        />
                        <Text style={{ fontSize: 12, color: 'black', textAlign: 'center' }}>Add  {'\n'} Bookmarks</Text>

                    </TouchableOpacity>
                </View>
                {
                    isAddBookMark || bookMarkArray.length < 1 ?
                        <View>
                            <TextInput
                                style={{
                                    borderRadius: 10, borderWidth: 1, marginHorizontal: 20, paddingStart: 10, marginBottom: 20, marginTop: 10,
                                    color: colors.black
                                }}
                                placeholder={'Enter book Markname'}
                                value={newBookMarkName}
                                onChangeText={(text) => setNewBookMarkName(text)}
                                placeholderTextColor={colors.Gray}
                            />

                            <TouchableOpacity onPress={() => {
                                btnActionSaveBookMark()
                                // bottomRef.current.close()


                            }}>
                                <View style={{
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5, paddingVertical: 10, marginHorizontal: 40, borderRadius: 10, backgroundColor: '#2D8BBE',

                                }}>
                                    <Text style={{ fontSize: 20, color: 'white', paddingTop: 3, textAlign: 'center' }}>Save Bookmark</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
                <View>

                </View>
                <View style={{ marginHorizontal: 20 }} >
                    {bookMarkArray.length > 0 ? GropDownListing() : null}
                </View>
                <TouchableOpacity onPress={() => {
                    bottomRef.current.close()


                }}>
                    <View style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5, paddingVertical: 10, marginHorizontal: 40, borderRadius: 10, backgroundColor: '#2D8BBE',
                        marginTop: 20
                    }}>
                        <Text style={{ fontSize: 20, color: 'white', paddingTop: 3, textAlign: 'center' }}>Done</Text>

                    </View>
                </TouchableOpacity>
            </View>
        )

    }
    const renderPageNum = () => {

        return (
            <View style={{ flex: 1, paddingBottom: 30 }}>
                <Text style={{ color: colors.black, textAlign: 'center', fontSize: 20 }} >
                    Goto page Number
                </Text>
                <Text style={{ color: colors.black, textAlign: 'center', fontSize: 16, marginVertical: 10 }} >
                    Enter  page number between (1-{totalpages})
                </Text>
                <TextInput
                    style={{
                        borderWidth: 1, marginHorizontal: 20, marginBottom: 30, borderRadius: 10, paddingStart: 10,
                        color: colors.black
                    }}
                    placeholder={'Enter page No.'}
                    value={pageNumber}
                    onChangeText={(text) => {
                        setPageNumber(text)
                    }}
                    keyboardType='phone-pad'
                    maxLength={totalpages > 0 ? totalpages.toString().length : 1}
                    placeholderTextColor={colors.Gray}
                />
                <TouchableOpacity
                    style={{ backgroundColor: '#2D8BBE', marginHorizontal: 20, borderRadius: 10 }}
                    onPress={() => {
                        if (parseInt(pageNumber) > 0 && parseInt(pageNumber) <= parseInt(totalpages)) {
                            setnoofpages(parseInt(pageNumber))

                            isMoveToPage.current = parseInt(pageNumber)
                            bottomRefPageNumber.current.close()
                        } else {
                            showToast('Invalid page number!!')
                        }
                    }}
                >
                    <Text style={{ color: colors.white, textAlign: 'center', fontSize: 20, paddingVertical: 10, }} >
                        Goto page {pageNumber ? `(${pageNumber})` : ''}
                    </Text>
                </TouchableOpacity>

            </View>
        )

    }


    const onBackPressReaderScreen = async () => {

        if (screendetail === 'Books' || screendetail === 'Bookshelf') {
            if (noofpages > (data.currentPage || 0)) {
                await updateBookProgress(data.id,
                    {
                        id: data.id,
                        percentage: parseInt((noofpages / totalpages) * 100),
                        currentPage: noofpages,
                    })
            }
        }
        else {
            if (noofpages > (data.currentPage || 0)) {
                await updateActvitiesProgress(data.id,
                    {
                        id: data.id,
                        percentage: parseInt((noofpages / totalpages) * 100),
                        currentPage: noofpages,
                    })
            }

        }
        navigation.goBack()
    }

    const Header = () => {
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 30 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#2F8ABF', paddingTop: 3, }}>{data.name}</Text>
            </View >
        )
    }
    const ProfileDetail = () => {
        return (
            <View style={{
                flex: 9,

                backgroundColor: 'white', borderTopRightRadius: 60, borderTopLeftRadius: 60,


            }}>
                <View style={{ flex: 5 }}>
                    {PDFViewer()}

                    {orientation === 'portrait' ?
                        <View style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 2,

                            position: 'absolute', right: 30, bottom: 120, backgroundColor: 'white', height: '30%', width: '10%', borderRadius: 20
                            , justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (scaleno !== 5) { setscaleno(scaleno + 1) }
                                else { setscaleno(scaleno) }
                            }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 34, color: 'red' }}>+
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (scaleno !== 1) { setscaleno(scaleno - 1) }
                                else { setscaleno(scaleno) }
                            }
                            }>
                                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 40, color: 'red' }}>-
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                    {orientation === 'landscape' ?
                        <View style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 2,

                            position: 'absolute', right: 30, bottom: 10, backgroundColor: 'white', height: 100, width: 40, borderRadius: 20
                            , justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (scaleno !== 5) { setscaleno(scaleno + 1) }
                                else { setscaleno(scaleno) }
                            }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 34, color: 'red' }}>+
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (scaleno !== 1) { setscaleno(scaleno - 1) }
                                else { setscaleno(scaleno) }
                            }
                            }>
                                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 40, color: 'red' }}>-
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }

                </View>
                <View style={{
                    borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 1,
                }}>
                    {Bottomview()}

                </View>

            </View>

        )
    }
    console.log('>>>  orientation >>>', orientation);
    const PDFViewer = () => {

        return (
            <View style={[styles.container, {}]}>
                {/* <View style={{ padding: 5 }}>
                    <Text style={{ fontFamily: 'billy'  , fontSize: 45, color: 'red', color: '#76D0F2' }}>
                        {data.name}
                    </Text>
                </View> */}
                <Pdf

                    trustAllCerts={false}
                    scale={scaleno}
                    page={isMoveToPage.current}
                    source={source}
                    enablePaging={true}
                    onLoadComplete={(numberOfPages, filePath) => {
                        settotalpages(numberOfPages)
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        setnoofpages(page)
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log('OnErr Pdf >>  ', error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={[styles.pdf, { width: getScreen().width * 0.85 }]} />

            </View >

        )
    }
    const Bottomview = () => {
        var percentage = noofpages / totalpages || 0

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10, backgroundColor: 'white' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{

                        color: colors.black
                    }}>Progress</Text>
                </View >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', }}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 3 }}
                        onPress={() => {
                            setnoofpages(noofpages - 1)
                            isMoveToPage.current = noofpages - 1
                        }}>
                        <SvgImage
                            source={BackPage}
                            style={{ width: 15, height: 28, }}
                        />
                    </TouchableOpacity>

                    <Progress.Bar progress={percentage} width={200} color={'#2D8BBE'} />
                    <TouchableOpacity

                        style={{ paddingHorizontal: 10, paddingVertical: 3 }}
                        onPress={() => {
                            setnoofpages(noofpages + 1)
                            isMoveToPage.current = noofpages + 1

                        }}>
                        <SvgImage
                            source={NextPage}
                            style={{ width: 15, height: 28, }}
                        />
                    </TouchableOpacity>
                </View >
                <TouchableOpacity
                    onPress={() => {
                        bottomRefPageNumber.current.open()
                    }}
                    style={{}}>
                    <View style={{ paddingBottom: 10, paddingHorizontal: 30, }}><Text style={{ color: '#FC6262' }}>{noofpages}/{totalpages}</Text></View>
                </TouchableOpacity>
            </View>
        )

    }
    const MainView = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#C3F3FD' }}>
                <TouchableOpacity
                    onPress={btnActionBookMarkPress}
                    style={{ position: 'absolute', right: 25, top: 25 }}
                >
                    <SvgImage
                        source={BookMark}
                        style={{ height: 40, width: 40, }}
                    />
                </TouchableOpacity>
                {Header()}

                {ProfileDetail()}

                {/* <PdfWrapper
                    source={{
                        uri: 'https://www.amsterdam.nl/publish/pages/506699/amsterdam_and_europe_historical_ties_eu2016_edition.pdf',
                    }}
                /> */}


                <SimpleBottomSheet
                    // title={true}
                    ref={bottomRef}
                    sheetData={renderBookMarkView}
                />
                <SimpleBottomSheet
                    // title={true}
                    ref={bottomRefPageNumber}
                    sheetData={renderPageNum}
                />
            </View>

        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <CustomActivityIndicator
                    isLoading={isLoading}
                />
                {MainView()}

            </View>
        </SafeAreaView>
    );
};


export default ReaderScreen;
const styles = StyleSheet.create({
    container: {

        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        height: Dimensions.get('window').height - 250,

    },
    pdf: {
        marginTop: 10,
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').height - 210,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});