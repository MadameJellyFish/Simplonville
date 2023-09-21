import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
    const {
    control,
    handleSubmit,
    } = useForm({
        defaultValues: {
        alertType: '',
        description: '',
        date: '',
        time: '',
        addressGeolocation: '',
        photo: '',
        firstName: '',
        lastName: '',
        address: '',
        zipCode: '',
        city: '',
        email: '',
        phone: '',
        },
    });

    const onSubmit = (data) => console.log(data);

    const alertType = [
        "Voirie",
        "Stationnement",
        "Travaux",
        "Eclairage public",
        "Objects abandonnés"
    ];

    const [date, setDate] = useState(new Date());

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission refusée");
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        reverseGeocode(location.coords.latitude, location.coords.longitude);
      };
    
      const reverseGeocode = async (lat, lon) => {
        let result = await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: lon,
        });
        setAddress(`${result[0].name}, ${result[0].city}, ${result[0].region}`);
      };

    const mapRegion = {
        latitude: 45.7472052,
        longitude: 4.8386992,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Alertez-nous</Text>
                        <Text style={styles.subtitle}>Ceci est un formulaire de signalement pour alerter les services municipaux en cas de dysfonctionnement dans notre ville.</Text>     
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.label}>Type d'alerte</Text>
                        <SelectDropdown
                            style={styles.dropdown}
                            data={alertType}
                            defaultButtonText={'Type d`alerte'}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            buttonStyle={styles.dropdownBtnStyle}
                            buttonTextStyle={styles.dropdownBtnTxtStyle}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdownDropdownStyle}
                            rowStyle={styles.dropdownRowStyle}
                            rowTextStyle={styles.dropdownRowTxtStyle}
                        >
                        </SelectDropdown>
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.label}>Description de l'alerte</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="description"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline
                                editable
                                numberOfLines={4}
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder="Prévoyez des itinéraires alternatifs et faites attention aux déviations."
                                paddingLeft={19}
                                maxLength={50}
                                color='#5f5ff5'
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            )}
                        />
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.label}>Date</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="date"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                editable
                                numberOfLines={4}
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder="22/09/2023"
                                paddingLeft={19}
                                color='#5f5ff5'
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            )}
                        />
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.label}>Horaire</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="time"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                editable
                                numberOfLines={4}
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder="15h30"
                                paddingLeft={19}
                                color='#5f5ff5'
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            )}
                        />
                    </View>
                    <View style={styles.containerMap}>
                        <MapView 
                            style={styles.map}
                            initialRegion={mapRegion}
                        />
                            <Marker
                            coordinate={{
                                latitude: 45.7472052,
                                longitude: 4.8386992,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            title="Marker"
                            />
                        </View>
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.label}>{address}</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="time"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                editable
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder=""
                                paddingLeft={19}
                                color='#5f5ff5'
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={address}
                            />
                            )}
                        />
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.section}>Mes coordonées</Text>
                    </View>

                    <View style={styles.containerItem}>
                        <Text style={styles.label}>Prenom</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="firstName"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                editable
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder="Kelly"
                                paddingLeft={19}
                                color='#5f5ff5'
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            )}
                        />
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.label}>Nom</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="lastName"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                editable
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder="Dupont"
                                paddingLeft={19}
                                color='#5f5ff5'
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            )}
                        />
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.label}>Email</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                editable
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder="contact@simplonville.com"
                                paddingLeft={19}
                                color='#5f5ff5'
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            )}
                        />
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={styles.label}>Phone</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="phone"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                editable
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder="0781525628"
                                paddingLeft={19}
                                color='#5f5ff5'
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            )}
                        />
                    </View>
                    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#5f5ff5',
    padding: 20,
    marginBottom: 50,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight:'500',
  },
  subtitle: {
    fontSize: 18,
    paddingTop: 10,
    color: '#fff',
  },
  containerItem: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    marginBottom: 20,
  },
  label: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 18,
    paddingLeft: 38,
    paddingBottom: 5,
    color: '#6d6d6d',
    fontWeight:500,
  },
  champContainer: {
    backgroundColor: '#efeffe',
    borderRadius: 25,
    padding: 10,
    width:'90%',
    height: 50,
  },
  dropdownBtnStyle: {
    width: '90%',
    height: 50,
    backgroundColor: '#5f5ff5',
    borderRadius: 25,
  },
  dropdownBtnTxtStyle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight:'600',
  },
  dropdownDropdownStyle: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
  },
  dropdownRowStyle: {
    backgroundColor: "#efeffe5", 
    borderBottomColor: '#a7a7f9',
    borderRadius: 50,
},
  dropdownRowTxtStyle: {
    color: '#5f5ff5',
    textAlign: 'center',
  },
  containerMap: {
    height:220,
    width: 335,
  },
  section: {
    marginTop: 20,
    color: '#5f5ff5',
    fontSize: 25,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});