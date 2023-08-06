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
import { DeleteIcon, DropDownIcon, FileUpload, ViewFiles, UserLogout } from '../../../helpers/CommonImages';
import storage from "@react-native-firebase/storage";
import DocumentPicker from "react-native-document-picker";
import CustomActivityIndicator from '../../../components/CustomActivityIndicator'

const AdminDashboardComponent = ({
    navigation,
    isLoading,
    booksDataList,
    btnActionUploadFile,
    btnActionRemoveBook,
    btnActionLogout,

}) => {


    const renderSeprator = () => {

        return (
            <View style={{ height: 1, backgroundColor: 'lightgray', marginVertical: 5 }} >

            </View>)
    }

    const renderItemBooks = ({ item }) => {


        return (
            <View
                style={{ paddingHorizontal: 20, paddingVertical: 5, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                <Text style={{ color: colors.black, fontSize: 20, textAlign: 'center', width: '80%' }} >
                    {item.name}
                </Text>
                <TouchableOpacity
                    onPress={() => btnActionRemoveBook(item)}
                    style={{ paddingHorizontal: 20, paddingVertical: 5, }}
                >
                    <SvgImage
                        source={DeleteIcon}
                        style={{ height: 30, width: 30, }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }
        }>
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomActivityIndicator
                    isLoading={isLoading}
                />

                <View style={{ width: screenWidth, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }} >
                    <Text style={{ color: colors.black, fontSize: 36, fontWeight: '700' }} >
                        مسنون وظائف
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }} >
                    <View>
                        <Text style={{ color: colors.black, fontSize: 20 }} >
                            Add New File
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity
                            onPress={btnActionUploadFile}
                            style={{
                                backgroundColor: colors.GreenLightBlur, borderRadius: 50, height: 50, width: 50,
                                justifyContent: 'center', alignItems: 'center',
                            }}
                        >
                            <SvgImage
                                source={FileUpload}
                                style={{ height: 25, width: 25, }}
                            />

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={btnActionLogout}
                            style={{
                                backgroundColor: colors.GreenLightBlur, borderRadius: 50, height: 50, width: 50,
                                justifyContent: 'center', alignItems: 'center',
                                marginStart: 10
                            }}
                        >
                            <SvgImage
                                source={UserLogout}
                                style={{ height: 25, width: 25, marginStart: 2 }}
                            />

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginVertical: 20 }} >
                    {renderSeprator()}
                </View>

                <Text style={{ color: colors.black, fontSize: 24, textAlign: 'center', fontWeight: '700' }} >
                    Your Books
                </Text>
                <FlatList
                    style={{ marginTop: 25 }}
                    data={booksDataList}
                    renderItem={renderItemBooks}
                    ItemSeparatorComponent={renderSeprator}
                />




            </View>
        </SafeAreaView >);
}

export default AdminDashboardComponent


const styles = StyleSheet.create({

})