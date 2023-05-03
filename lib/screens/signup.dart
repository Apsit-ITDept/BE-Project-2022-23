import 'package:firebase_auth/firebase_auth.dart';
import 'package:last/reusable_widgets/reusable_widgets.dart';
import 'info2.dart';
import 'package:last/utils/color.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:string_validator/string_validator.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({Key? key}) : super(key: key);

  @override
  _SignUpScreenState createState() => _SignUpScreenState();
}

msg(error) {
  Fluttertoast.showToast(
    msg: error,
    gravity: ToastGravity.BOTTOM,
    timeInSecForIosWeb: 4,
    fontSize: 18.0,
    backgroundColor: Colors.red,
    textColor: Colors.white,
    webPosition: "center",
    webBgColor: "linear-gradient(to right, #dc1c13, #dc1c13)",
  );
}

class _SignUpScreenState extends State<SignUpScreen> {
  TextEditingController _passwordTextController = TextEditingController();
  TextEditingController _passwordTextController2 = TextEditingController();
  TextEditingController _emailTextController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          "Sign Up",
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
                // logoWidget("logo1.png"),
                const SizedBox(
                  height: 20,
                ),
                reusableTextField("Enter Moodle Id", Icons.person_outline,
                    false, _emailTextController),
                const SizedBox(
                  height: 20,
                ),
                reusableTextField("Enter Password", Icons.lock_outlined, true,
                    _passwordTextController),
                const SizedBox(
                  height: 20,
                ),
                reusableTextField("Confirm Password", Icons.lock_outlined, true,
                    _passwordTextController2),
                const SizedBox(
                  height: 20,
                ),
                firebaseUIButton(context, "Sign Up", () {
                  String check = "@apsit.edu.in";
                  if (_emailTextController.text == "" ||
                      _passwordTextController.text == "") {
                    msg("Check Input please");
                  } else if (isLength(_passwordTextController.text, 6) ==
                      false) {
                    msg("Password must be greater than 6");
                  } else if (equals(_passwordTextController.text,
                          _passwordTextController2.text) ==
                      false) {
                    msg("Password doesn't match");
                  } else if (isNumeric(_emailTextController.text) == false) {
                    msg("Email is not valid");
                  } else {
                    FirebaseAuth.instance
                        .createUserWithEmailAndPassword(
                            email: _emailTextController.text + check,
                            password: _passwordTextController.text)
                        .then((value) {
                      Navigator.push(context,
                          MaterialPageRoute(builder: (context) => infopage()));
                    }).onError((error, stackTrace) {
                      msg("Something went wrong");
                    });
                  }
                })
              ],
            ),
          ))),
    );
  }
}
