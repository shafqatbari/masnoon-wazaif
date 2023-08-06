import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Platform,
    Image
} from 'react-native';
import colors from '../../../helpers/colors';
import { strings } from '../../../helpers/Localization';
import SvgImage from '../../../components/SvgImage'
import { screenHeight, screenWidth } from '../../../helpers/Constants';
import { UserLogin, ViewFiles } from '../../../helpers/CommonImages';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator'
import SimpleBottomSheet from '../../../components/SimpleBottomSheet'
import { showToast } from '../../../helpers/Utils';
import ScreenNames from '../../../helpers/ScreenNames';
import moment from 'moment';

const HomeComponent = ({
    navigation,
    booksData,
    isLoading,
    bottomRef,
    userPassword,
    userPasswordEntered,
    userPasswordCount,
    setUserPasswordCount,
    setUserPasswordEntered,
    btnActionUploadFile,
    onPressCellItem,
}) => {

    const renderItemBooks = ({ item }) => {


        return (
            <TouchableOpacity
                onPress={() => onPressCellItem(item)}
                style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: colors.GreenLightBlur, marginHorizontal: 20, borderRadius: 20, }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={{ color: colors.black, fontSize: 16, }} >
                        Book Name
                    </Text>
                    <Text style={{ color: colors.black, fontSize: 16, }} >
                        {item.name}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={{ color: colors.black, fontSize: 16, }} >
                        Uploaded date:
                    </Text>
                    <Text style={{ color: colors.black, fontSize: 16, }} >
                        {moment(item.date).format('DD-MM-YYYY')}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderSeprator = () => {

        return (
            <View style={{ height: 1, backgroundColor: 'lightgray', marginVertical: 5 }} >

            </View>)
    }

    const renderAdminPassword = () => {

        return (
            <View style={{}}>
                <TextInput
                    style={{ borderRadius: 10, borderWidth: 1, marginHorizontal: 20, paddingStart: 10, marginBottom: 20, color: colors.black }}
                    placeholder={'Enter Admin Password'}
                    value={userPasswordEntered}
                    onChangeText={(text) => setUserPasswordEntered(text)}
                    placeholderTextColor={colors.Gray}
                />
                <TouchableOpacity onPress={() => {
                    bottomRef.current.close()
                    if (userPassword === userPasswordEntered) {
                        setUserPasswordEntered('')
                        setUserPasswordCount(0)
                        navigation.navigate(ScreenNames.AdminDashboard, { booksData: booksData })
                    }
                    else {
                        showToast('Wrong Password!!')
                    }

                }}>
                    <View style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5, paddingVertical: 10, marginHorizontal: 40, borderRadius: 10, backgroundColor: '#2D8BBE', marginBottom: 20
                    }}>
                        <Text style={{ fontSize: 22, color: 'white', fontWeight: '600', paddingTop: 3, textAlign: 'center' }}>Done</Text>

                    </View>
                </TouchableOpacity>

            </View>
        )

    }

    return (
        < SafeAreaView style={{ flex: 1, backgroundColor: colors.white }
        }>
            <View style={{ flex: 1, backgroundColor: colors.White }}>
                <CustomActivityIndicator
                    isLoading={isLoading}
                />
                <View style={{ width: screenWidth, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }} >
                    <Text style={{ color: colors.black, fontSize: 36, fontWeight: '700' }} >
                        مسنون وظائف
                    </Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }} >
                    {/* <Text style={{ color: colors.black, fontSize: 20 }} >
                        Add New File
                    </Text> */}
                    <View>
                    </View>
                    <TouchableOpacity

                        onPress={btnActionUploadFile}
                        style={{
                            backgroundColor: colors.GreenLightBlur, borderRadius: 50, height: 50, width: 50,
                            justifyContent: 'center', alignItems: 'center',
                        }}
                    >
                        <SvgImage
                            source={UserLogin}
                            style={{ height: 25, width: 25, marginStart: 2 }}
                        />
                        {/* <Text style={{ marginTop: 5, color: colors.black }} >
                            {strings.UploadFile}
                        </Text> */}

                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 20 }} >
                    {renderSeprator()}
                </View>
                <Text style={{ color: colors.black, fontSize: 26, textAlign: 'center', fontWeight: '700' }} >
                    Books Listing
                </Text>

                <FlatList
                    style={{ marginTop: 25 }}
                    data={booksData}
                    renderItem={renderItemBooks}
                    ItemSeparatorComponent={renderSeprator}
                />
                <SimpleBottomSheet
                    title={true}
                    ref={bottomRef}
                    sheetData={renderAdminPassword}
                />

            </View>
        </SafeAreaView >);
}

export default HomeComponent


const styles = StyleSheet.create({

})