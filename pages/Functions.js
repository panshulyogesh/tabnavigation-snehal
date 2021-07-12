import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Alert,
  Modal,
  Pressable,
} from 'react-native';

const read_store_async = async (event, userdata, option) => {
  const storedValue = await AsyncStorage.getItem('user_config');

  let userdata_str = JSON.stringify(userdata);
  let userdata_obj = JSON.parse(userdata_str);
  let storedValue_obj = JSON.parse(storedValue);

  switch (event) {
    case 'owner_event':
      if (storedValue_obj == null) {
        await AsyncStorage.setItem('user_config', userdata);
        return 'Data is updated';
        getData();
      } else {
        await AsyncStorage.setItem('user_config', userdata);
        return 'Data is updated';
        getData();
      }
      break;

    case 'location_event':
      if (option == 'add') {
        if (storedValue_obj.location.length <= 0) {
          storedValue_obj.location.push(userdata_obj);

          let string_data = JSON.stringify(storedValue_obj);
          console.log('data===?', string_data);
          await AsyncStorage.setItem('user_config', string_data);
          return 'data is updated';

          getData();
        } else {
          let loc_status = 0,
            loc_len = storedValue_obj.location.length;
          for (let x = 0; x < loc_len; x++) {
            if (userdata_obj == storedValue_obj.location[x]) {
              loc_status = 1;
              break;
            }
          }
          if (loc_status == 0) {
            storedValue_obj.location.push(userdata_obj);
            let string_data1 = JSON.stringify(storedValue_obj);
            console.log('data===?', string_data1);
            await AsyncStorage.setItem('user_config', string_data1);
            return 'data is updated';
            getData();
          } else {
            return 'same data found ';
            loc_status = 0;
          }
        }
      } else if (option == 'delete') {
        for (var i = 0; i < storedValue_obj.location.length; i++) {
          storedValue_obj.location.splice(
            storedValue_obj.location.indexOf(userdata),
            1,
          );
          console.log('value after deleting', storedValue_obj.location);
          let string_data1 = JSON.stringify(storedValue_obj);
          await AsyncStorage.setItem('user_config', string_data1);
          return 'succesfully deleted';
        }
      }

      break;

    case 'appliance_event':
      if (option == 'add') {
        if (storedValue_obj.appliance.length <= 0) {
          storedValue_obj.appliance.push(userdata_obj);
          let string_data = JSON.stringify(storedValue_obj);
          await AsyncStorage.setItem('user_config', string_data);
          return 'data is updated';
          getData();
        } else {
          let app_status = 0,
            app_len = storedValue_obj.appliance.length;
          for (let x = 0; x < app_len; x++) {
            if (userdata_obj == storedValue_obj.appliance[x]) {
              app_status = 1;
              break;
            }
          }

          if (app_status == 0) {
            storedValue_obj.appliance.push(userdata_obj);
            let string_data1 = JSON.stringify(storedValue_obj);
            await AsyncStorage.setItem('user_config', string_data1);
            return 'data is updated';
            getData();
          } else {
            console.log('same data found ');
            return 'same data found ';
            app_status = 0;
          }
        }
      } else if (option == 'delete') {
        for (var i = 0; i < storedValue_obj.appliance.length; i++) {
          storedValue_obj.appliance.splice(
            storedValue_obj.appliance.indexOf(userdata),
            1,
          );
          console.log('value after deleting', storedValue_obj.appliance);
          let string_data1 = JSON.stringify(storedValue_obj);
          await AsyncStorage.setItem('user_config', string_data1);
          return 'succesfully deleted';
        }
      }
      break;
  }
};

const check_password = async pass => {
  const async_data_owner = await AsyncStorage.getItem('user_config');
  var result = '';
  if (async_data_owner) {
    let read = JSON.parse(async_data_owner);
    if (pass == read.owner.owner_password) {
      result = 'valid';
    } else {
      result = 'invalid';
    }

    return result;
  } else {
    result = 'valid';

    return result;
  }
};

const getData = async () => {
  const value = await AsyncStorage.getItem('user_config');
  if (value != null) {
    console.log(' after storing new data inside async storage ', value);
  }
};

export {check_password, read_store_async};
