import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'screens/signin.dart';
import 'screens/mentoring.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
      options: const FirebaseOptions(
          apiKey: 'AIzaSyAC0U2p59F2fuVhI_2cqpmjLbjWukXomjk',
          appId: '1:591328014889:android:58a0421e597fc2538b2238',
          messagingSenderId: '591328014889',
          projectId: 'pro1-da010'));
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SignInScreen(),
    );
  }
}
