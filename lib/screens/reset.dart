import 'package:firebase_auth/firebase_auth.dart';
import 'package:last/reusable_widgets/reusable_widgets.dart';
// import 'home.dart';
import 'package:last/utils/color.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:string_validator/string_validator.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword({Key? key}) : super(key: key);

  @override
  _ResetPasswordState createState() => _ResetPasswordState();
}

msg(error) {
  Fluttertoast.showToast(
    msg: error,
    gravity: ToastGravity.CENTER,
    timeInSecForIosWeb: 6,
    fontSize: 18.0,
  );
}

class _ResetPasswordState extends State<ResetPassword> {
  TextEditingController _emailTextController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          "Reset Password",
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
            padding: EdgeInsets.fromLTRB(20, 120, 20, 0),
            child: Column(
              children: <Widget>[
                const SizedBox(
                  height: 20,
                ),
                reusableTextField("Enter Email Id", Icons.person_outline, false,
                    _emailTextController),
                const SizedBox(
                  height: 20,
                ),
                firebaseUIButton(context, "Reset Password", () {
                  if (isEmail(_emailTextController.text) == false) {
                    msg("Please Enter valid Email");
                    _emailTextController.clear();
                  } else if (_emailTextController.text == "") {
                    msg("Please Add Email Id");
                  } else {
                    FirebaseAuth.instance
                        .sendPasswordResetEmail(
                            email: _emailTextController.text)
                        .then((value) => Navigator.of(context).pop());
                    msg("Check your Mail or Spam mail");
                  }
                })
              ],
            ),
          ))),
    );
  }
}
