import LocalizedStrings from 'react-native-localization';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { itemList, DEFAULT_LANGUAGE } from '../screens/ChangeLanguage'

export let enLocalString = {
    UploadFile: 'Upload File',
    SelectTier: 'Select Tier',
    BaseSalary: 'Base Salary',
    EnterYoursalaryHere: 'Enter your salary here!',
    OtherAmount: 'Other Amount',
    EnterYouradditionalAmountHere: 'Enter additional amount here!',
    FuelAllowanceFor_TIER_: 'Fuel Allowance for Tier _TIER_',
    FuelAllowance_AMOUNT_: 'Fuel Allowance = _AMOUNT_',
    TwentyMedical: '20% Medical',
    TaxOn_TAX_VALUE_: '(Tax on "_TAX_") = _VALUE_',
}

export let esLocalString = {

}

export const enStrings = async () => {

}
export var strings = new LocalizedStrings({
    "en": enLocalString,
    "es": esLocalString,
});