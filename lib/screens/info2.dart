import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:last/reusable_widgets/reusable_widgets.dart';
import 'package:last/utils/color.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'signup.dart';
import 'quiz.dart';
import 'package:string_validator/string_validator.dart';
import 'package:fluttertoast/fluttertoast.dart';

class infopage extends StatefulWidget {
  @override
  _infopageState createState() => _infopageState();
}

msg(error) {
  Fluttertoast.showToast(
    msg: error,
    gravity: ToastGravity.BOTTOM,
    timeInSecForIosWeb: 4,
    fontSize: 18.0,
  );
}

class _infopageState extends State<infopage> {
  // ====================================================== //
  String? FName, Lname, Rank, CollegeEmail;
  int? MoodleID, year, Points;
  bool testdone = false;

  // TODO Create Data
  createData() {
    DocumentReference documentReference = FirebaseFirestore.instance
        .collection('students')
        .doc(_MoodleIDController.text);

    // create Map to send data in key:value pair form
    Map<String, dynamic> students = ({
      "CollegeEmail": _emailTextController.text,
      "Fname": _FirstnameController.text,
      "Lname": _LastnameController.text,
      "MoodleID": int.parse(_MoodleIDController.text),
      "Points": Points,
      "Rank": Rank,
      "testdone": testdone,
      "year": int.parse(_collegeyearController.text),
    });

    // send data to Firebase
    documentReference
        .set(students)
        .whenComplete(() => print('Done'))
        .onError((error, stackTrace) => print("This is error $error"));

    Navigator.push(
        context, MaterialPageRoute(builder: (context) => QuizScreen()));
  }

  TextEditingController _FirstnameController = TextEditingController();
  TextEditingController _LastnameController = TextEditingController();
  TextEditingController _MoodleIDController = TextEditingController();
  TextEditingController _emailTextController = TextEditingController();
  TextEditingController _collegeyearController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        automaticallyImplyLeading: false,
        centerTitle: true,
        title: const Text(
          "Information",
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
      ),
      body: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
          hexStringToColor("191825"),
          hexStringToColor("191825"),
          hexStringToColor("191825")
        ], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.fromLTRB(
                10, MediaQuery.of(context).size.height * 0.2, 10, 0),
            child: Column(
              children: <Widget>[
                const SizedBox(
                  height: 10,
                ),

                reusableTextField("First Name", Icons.person_outline, false,
                    _FirstnameController),
                const SizedBox(
                  height: 20,
                ),
                const SizedBox(
                  height: 10,
                ),

                reusableTextField("Last Name", Icons.person_outline, false,
                    _LastnameController),
                const SizedBox(
                  height: 20,
                ),
                const SizedBox(
                  height: 10,
                ),

                reusableTextField("Moodle ID", Icons.lock_outline, false,
                    _MoodleIDController),
                const SizedBox(
                  height: 20,
                ),
                const SizedBox(
                  height: 10,
                ),

                reusableTextField("College Email", Icons.person_outline, false,
                    _emailTextController),
                const SizedBox(
                  height: 20,
                ),
                const SizedBox(
                  height: 10,
                ),

                reusableTextField("College Year", Icons.person_outline, false,
                    _collegeyearController),
                const SizedBox(
                  height: 20,
                ),
                forgetPassword(context),
                firebaseUIButton(context, "Continue", () {
                  if (isEmail(_emailTextController.text) == false) {
                    msg("Email is Not valid");
                  } else if (int.parse(_collegeyearController.text) > 4) {
                    msg("College year is not valid");
                  } else if (_emailTextController.text == "" ||
                      _FirstnameController.text == "" ||
                      _LastnameController.text == "" ||
                      _MoodleIDController.text == "" ||
                      _collegeyearController.text == "") {
                    msg("Please Enter all field");
                  } else {
                    onPressed:
                    createData();
                  }
                }),
                // signUpOption()
              ],
            ),
          ),
        ),
      ),
    );
  }

  // Row signUpOption() {
  //   return Row(
  //     mainAxisAlignment: MainAxisAlignment.center,
  //     children: [
  //       const Text("Don't have account?",
  //           style: TextStyle(color: Colors.white70)),
  //       GestureDetector(
  //         onTap: () {
  //           Navigator.push(context,
  //               MaterialPageRoute(builder: (context) => SignUpScreen()));
  //         },
  //         child: const Text(
  //           " Sign Up",
  //           style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
  //         ),
  //       )
  //     ],
  //   );
  // }

  Widget forgetPassword(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      height: 25,
      alignment: Alignment.bottomRight,
      child: TextButton(
        onPressed: () {},
        child: const Text(
          "If your in TE enter 3 here",
          style: TextStyle(color: Colors.white70),
          textAlign: TextAlign.right,
        ),
      ),
    );
  }
}


  // @override
  // Widget build(BuildContext context) {
  //   return Scaffold(
  //     body: SingleChildScrollView(
  //       child: Padding(
  //         padding: EdgeInsets.all(12.0),
  //         child: Column(
  //           children: [
  //             TextFormField(
  //               style: simpleTextStyle(),
  //               decoration: textFieldInputDecoration(
  //                 'First Name',
  //                 Icon(Icons.account_circle_outlined),
  //               ),
  //               onChanged: (String FName) {
  //                 setState(() {
  //                   getFName(FName);
  //                 });
  //               },
  //             ),
  //             TextFormField(
  //               style: simpleTextStyle(),
  //               decoration: textFieldInputDecoration(
  //                 'Last Name',
  //                 Icon(Icons.account_circle_outlined),
  //               ),
  //               onChanged: (String Lname) {
  //                 setState(() {
  //                   getLname(Lname);
  //                 });
  //               },
  //             ),
  //             TextFormField(
  //               style: simpleTextStyle(),
  //               decoration: textFieldInputDecoration(
  //                 'College Email',
  //                 Icon(Icons.account_circle_outlined),
  //               ),
  //               onChanged: (String CollegeEmail) {
  //                 setState(() {
  //                   getCollegeEmail(CollegeEmail);
  //                 });
  //               },
  //             ),
  //             TextFormField(
  //               style: simpleTextStyle(),
  //               decoration: textFieldInputDecoration(
  //                 'Moodle ID',
  //                 Icon(Icons.account_circle_outlined),
  //               ),
  //               onChanged: (String MoodleID) {
  //                 setState(() {
  //                   getMoodleID(MoodleID);
  //                 });
  //               },
  //             ),
  //             TextFormField(
  //               style: simpleTextStyle(),
  //               decoration: textFieldInputDecoration(
  //                 'College Year',
  //                 Icon(Icons.account_circle_outlined),
  //               ),
  //               onChanged: (String year) {
  //                 setState(() {
  //                   getyear(year);
  //                 });
  //               },
  //             ),
  //             SizedBox(height: 25.0),
  //             Row(
  //               children: [
  //                 Expanded(
  //                   child: ElevatedButton(
  //                       onPressed: () => createData(),
  //                       child: const Text('Add Data')),
  //                 ),
  //               ],
  //             ),
  //           ],
  //         ),
  //       ),
  //     ),
  //   );