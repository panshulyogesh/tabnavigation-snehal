import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Button,
  useEffect,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import {useFocusEffect} from '@react-navigation/native';
const Binding = ({navigation}) => {
  const [asyncloc, setasyncloc] = useState([]);
  const [asyncapp, setasyncapp] = useState([]);
  const [location, setlocation] = useState([]);
  const [appliance, setappliance] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [retrieveData]),
  );

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(value);
      console.log('async data loc:', async_data);
      // console.log('async data app:', async_data.appliance);
      setasyncloc(async_data.location);
      setasyncapp(async_data.appliance);
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleSubmitPress = () => {
    if (!location) {
      alert('Please enter location');
      return;
    }
    if (!appliance) {
      alert('Please enter appliance');
      return;
    }
    console.log('chosen appliance ', location, 'location', appliance);
    //let binding = location.concat(appliance);
    let binding = async_data.owner.owner_name+'_'+location + '_' + appliance;

    console.log('binded appliance and location', binding);

    const store = async userdata => {
      console.log('-----------------------------');
      console.log('data from user ', userdata);
      const read_async_data = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(read_async_data);
      console.log('Async data:', async_data);
      console.log('Async data for binding :', async_data.Binding);
      console.log('Async data for Binding length :', async_data.Binding.length);
      if (async_data.Binding.length <= 0) {
        async_data.Binding.push(userdata);

        console.log('data to be written in async', async_data);
        let string_data = JSON.stringify(async_data);
        await AsyncStorage.setItem('user_config', string_data);
        Alert.alert('Data is updated');
        getData();
      } else {
        let Binding_status = 0;
        let Binding_len = async_data.Binding.length;

        for (let x = 0; x < Binding_len; x++) {
          console.log(
            'userdata' + userdata,
            'async Binding[x]' + async_data.Binding[x],
          );
          if (userdata == async_data.Binding[x]) {
            Binding_status = 1;
            break;
          }
        }
        console.log('local status', Binding_status);
        if (Binding_status == 0) {
          async_data.Binding.push(userdata);
          console.log('Binding_data:', async_data.Binding[0]);

          console.log('data to be written in async', async_data);
          let string_data1 = JSON.stringify(async_data);
          await AsyncStorage.setItem('user_config', string_data1);
          Alert.alert('Data is updated');
          getData();
          let xyz = await getData();
          console.log('xyz', xyz);
          let zxy = JSON.parse(xyz);
          for (let i = 0; i < zxy.Binding.length; i++) {
            if (zxy.Binding[i] == 'bedroom_fan') {
              console.log('found this value');
            }else{
              console.log("not  found");
            }
          }
        } else {
          console.log('same data found ');
          Alert.alert(
            'Binding name already present, please insert new Binding name',
          );
          Binding_status = 0;
        }
      }
    };
    const getData = async () => {
      const value = await AsyncStorage.getItem('user_config');
      console.log('data read from async >>', value);
      if (value != null) {
        console.log(' after storing new data inside async storage ', value);
        return value;
      }
    };

    let data2 = JSON.stringify(binding);
    if (data2 != null) {
      store(data2);
    }
  };
  return (
    <ScrollView>
      <View>
        <ModalDropdown
          textStyle={{
            fontSize: 16,
            paddingTop: 8,
            paddingBottom: 8,
            alignItems: 'center',
          }}
          dropdownTextStyle={{fontSize: 30}}
          options={asyncloc}
          defaultValue={'select location'}
          onSelect={(idx, value) => setlocation(value)}></ModalDropdown>
      </View>
      <View>
        <ModalDropdown
          textStyle={{
            fontSize: 16,
            paddingTop: 8,
            paddingBottom: 8,
            alignItems: 'center',
          }}
          dropdownTextStyle={{fontSize: 30}}
          options={asyncapp}
          defaultValue={'select appliance'}
          onSelect={(idx, value) => setappliance(value)}></ModalDropdown>

        <Button title="submit" color="green" onPress={handleSubmitPress} />
      </View>
    </ScrollView>
  );
};

export default Binding;
