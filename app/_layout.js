// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import { View, Text, Image, StyleSheet } from "react-native";

// const Logo = require('../assets/images/logo.png');

// export default function Layout({ navigation }) {
//     // useEffect(() => {
//     //     setTimeout(() => {
//     //         navigation.navigate('Index');
//     //     }, 3000);
        
//     // }, []);

//     return (
//     <View style={styles.container}>
//         <Image
//             source={Logo}
//             style={styles.logo}>
//         </Image>
//         <Text style={styles.title}>Simplon
//             <Text style={styles.boldText}>Ville</Text>
//         </Text>
//         <StatusBar style="auto" />
//     </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#5f5ff5',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     logo: {
//         width: '15%',
//         height: '15%',
//         resizeMode: 'cover',
//         tintColor: '#fff',
//         marginBottom: 10,
//     },
//     title: {
//         color: '#fff',
//         fontSize: 30,
//         fontWeight: '200',
//     },
//     boldText: {
//         fontWeight: '500',
//     }
// });