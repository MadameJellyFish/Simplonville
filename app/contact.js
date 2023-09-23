import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';
import MapView, {Marker} from 'react-native-maps';
import { Camera, CameraType } from 'expo-camera';
import DateTimePiker from '@react-native-community/datetimepicker';

import * as Location from 'expo-location';

const alertType = [
    "Voirie",
    "Stationnement",
    "Travaux",
    "Eclairage public",
    "Objects abandonnés"
];

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
        photo: '',
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone: '',
        },
    });

    const onSubmit = (data) => console.log(data);
    
    const [date, setDate] = useState(new Date());
    
    const [locationPicker, setLocationPicker] = useState(null);
    const [address, setAddress] = useState("");
    const [currentLocation, setCurrentLocation] = useState(null);

    const [mapRegion, setMapRegion] = useState({
    });

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission refusée");
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});

        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0498,
            longitudeDelta: 0.0421,
        })
        
        setCurrentLocation(location);
        reverseGeocode(location.coords.latitude, location.coords.longitude);
    };
    
    const reverseGeocode = async (lat, lon) => {
        let result = await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: lon,
        });
        setAddress(`${result[0].name}, ${result[0].city}, ${result[0].region}`);
    };

    useEffect(() => {
        getLocation();
    }, [address]);

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

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
                                    placeholder={date.toLocaleDateString()}
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
                            initialRegion={{
                                latitude: mapRegion.latitude,
                                longitude: mapRegion.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                                }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: mapRegion.latitude,
                                    longitude: mapRegion.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title="Marker"
                                draggable
                                onDragEnd={(e) => {setLocationPicker(e.nativeEvent.coordinate)
                                    getLocation();
                                }}
                            />
                        </MapView> 
                        </View>
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={[styles.label, {marginTop:20}]}>Adresse sélectionnée</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="address"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                editable
                                style={[styles.champContainer, {paddingTop:10, height:'auto'} ]}
                                placeholder="ex: 48 rue du Bonheur "
                                paddingLeft={19}
                                color="#5f5ff5"
                                autoCapitalize="words"
                                fontSize= {17}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={address}
                            />
                            )}
                        />
                    </View>
                    <View style={styles.containerItem}>
                        <Text style={[styles.label, {marginBottom:10}]}>Photo</Text>
                        <View style={styles.containerCamera}>
                            <Camera style={styles.camera} type={type}>
                                <View style={styles.buttonContainerCamera}>
                                <TouchableOpacity style={styles.buttonCamera} onPress={toggleCameraType}>
                                    <Text style={styles.textCamera}>Flip Camera</Text>
                                </TouchableOpacity>
                                </View>
                            </Camera>
                        </View>
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
                                color="#5f5ff5"
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
                    <Button
                        title="Submit"
                        theme="submit"
                        onPress={handleSubmit(onSubmit)}
                        style={[styles.button]} 
                    />
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
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginTop: 50,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#5f5ff5',
        backgroundColor: '#5f5ff5',
        borderRadius:50,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerCamera: {
        flex: 1,
        justifyContent: 'center',
      },
      camera: {
        flex: 1,
        borderRadius:5,
      },
      buttonContainerCamera: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 120,
      },
      buttonCamera: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      textCamera: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
});