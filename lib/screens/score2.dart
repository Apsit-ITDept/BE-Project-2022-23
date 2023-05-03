import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'gameselect.dart';

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  String _documentId = '';

  @override
  void initState() {
    super.initState();
    _getDocumentId();
  }

  void _getDocumentId() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      // _documentId = user.uid;
      final name = user.displayName;
      final email = user.email;
      String username = email.toString();
      var x = username.split("@");
      _documentId = x[0];
    } else {
      // If user is not logged in, do something else
      // For example, show a login screen
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_documentId.isEmpty) {
      return Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    } else {
      return StreamBuilder<DocumentSnapshot>(
          stream: _db.collection('students').doc(_documentId).snapshots(),
          builder: (context, snapshot) {
            if (!snapshot.hasData) {
              return Center(child: CircularProgressIndicator());
            }
            final String video = snapshot.data!.get('video_score');
            final String audio = snapshot.data!.get('audio_score');
            final int quiz = snapshot.data!.get('Points');
            final int intvideo = int.parse(video);
            final int intaudio = int.parse(audio);
            final int finalaudio = (100 - (6.25 * intaudio)).round();
            final double total =
                ((intvideo + finalaudio + quiz * 20) / 3) as double;
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              home: Scaffold(
                backgroundColor: Color(0xFF191825),
                body: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Overall Score',
                        style:
                            TextStyle(fontSize: 36.0, color: Color(0xFFFFFFFF)),
                      ),
                      SizedBox(height: 20.0),
                      Text(
                        '${total.round()}' + "/" + "100",
                        style:
                            TextStyle(fontSize: 56.0, color: Color(0xFFFFFFFF)),
                      ),
                      SizedBox(height: 75.0),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Column(
                            children: [
                              Text(
                                'Quiz Score',
                                style: TextStyle(
                                    fontSize: 18.0, color: Color(0xFFFFFFFF)),
                              ),
                              SizedBox(height: 10.0),
                              Text(
                                '${quiz * 20}',
                                style: TextStyle(
                                    fontSize: 32.0, color: Color(0xFFFFFFFF)),
                              ),
                            ],
                          ),
                          SizedBox(width: 20.0),
                          Column(
                            children: [
                              Text(
                                'Video Score',
                                style: TextStyle(
                                    fontSize: 18.0, color: Color(0xFFFFFFFF)),
                              ),
                              SizedBox(height: 10.0),
                              Text(
                                '${video}',
                                style: TextStyle(
                                    fontSize: 32.0, color: Color(0xFFFFFFFF)),
                              ),
                            ],
                          ),
                          SizedBox(width: 20.0),
                          Column(
                            children: [
                              Text(
                                'Audio Score',
                                style: TextStyle(
                                    fontSize: 18.0, color: Color(0xFFFFFFFF)),
                              ),
                              SizedBox(height: 10.0),
                              Text(
                                '${finalaudio}',
                                style: TextStyle(
                                    fontSize: 32.0, color: Color(0xFFFFFFFF)),
                              ),
                            ],
                          ),
                        ],
                      ),
                      SizedBox(height: 50.0),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            primary: Color.fromARGB(
                                255, 134, 93, 255), // Background color
                            onPrimary:
                                Colors.white, // Text Color (Foreground color)
                            padding: EdgeInsets.all(20)),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => GameSelect()),
                          );
                        },
                        child: Text('Continue', style: TextStyle(fontSize: 24)),
                      )
                    ],
                  ),
                ),
              ),
            );
          });
    }
  }
}
