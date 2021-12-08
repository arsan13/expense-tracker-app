import {Alert, PermissionsAndroid} from 'react-native';
import moment from 'moment';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';

const ExportToExcel = async (type, selectedDate, data) => {
  let presentDate = new Date();
  if (type === 'Day') selectedDate = moment(selectedDate).format('DD-MMM-YYYY');
  else if (type === 'Month')
    selectedDate = moment(selectedDate).format('MMMM,YYYY');
  else if (type === 'Year') selectedDate = selectedDate.toString();
  else selectedDate = '';

  const filePath = RNFS.DownloadDirectoryPath;
  const filename = `${filePath}/Report(${selectedDate})_${presentDate.getTime()}.xlsx`;

  // function to handle exporting
  const exportDataToExcel = () => {
    let wb = XLSX.utils.book_new(); //Create workbook
    let ws = XLSX.utils.json_to_sheet(data); //Create worksheet
    XLSX.utils.book_append_sheet(wb, ws, selectedDate); //Add sheet to workbook
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}); //Excel file

    // Write generated excel to Storage
    RNFS.writeFile(filename, wbout, 'ascii')
      .then(r => {
        Alert.alert(
          'Successful!',
          'Exported successfully, Check your downloads',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: true},
        );
        console.log('Success');
      })
      .catch(e => {
        Alert.alert(
          'Unsuccessful!',
          'Please try again',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: true},
        );
        console.log('Error', e);
      });
  };

  try {
    // Check for Permission (check if permission is already given or not)
    let isPermitedExternalStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!isPermitedExternalStorage) {
      // Ask for permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage permission needed',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted (calling our exportDataToExcel function)
        console.log('Permission granted');
        exportDataToExcel();
      } else {
        // Permission denied
        console.log('Permission denied');
      }
    } else {
      // Already have Permission (calling our exportDataToExcel function)
      exportDataToExcel();
    }
  } catch (e) {
    Alert.alert(
      'Unsuccessful!',
      'A Problem occured. Please try again later',
      [
        {
          text: 'Ok',
        },
      ],
      {cancelable: true},
    );
    console.log('Error while checking permission');
    console.log(e);
  }
};

export default ExportToExcel;
