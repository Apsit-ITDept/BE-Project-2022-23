import 'dart:convert';
import 'dart:io';
import 'signin.dart';
import 'score2.dart';
import 'dart:typed_data';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;
import 'package:firebase_auth/firebase_auth.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'dart:developer';

class VideoUploaderScreen extends StatefulWidget {
  @override
  _VideoUploaderScreenState createState() => _VideoUploaderScreenState();
}

class _VideoUploaderScreenState extends State<VideoUploaderScreen> {
  Uint8List? _videoBytes;
  String? _videoFileName;
  String? _videoBase64;
  String _status = '';
  User? user = FirebaseAuth.instance.currentUser;

  Future<void> _selectVideo() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.video,
    );
    if (result != null) {
      setState(() {
        _videoBytes = result.files.single.bytes!;
        _videoFileName = result.files.single.name;
        _videoBase64 = base64.encode(_videoBytes!);
      });
    }
  }

  Future<void> _uploadVideo() async {
    setState(() {
      _status = 'Testing your skills...';
    });
    try {
      String url = 'http://localhost:5000/'; // Replace with your server URL
      Map<String, String> headers = {
        'Content-Type': 'application/json',
      };
      String jsonBody = jsonEncode({
        'video': _videoBase64,
      });
      final user = FirebaseAuth.instance.currentUser;

      http.Request request = http.Request('POST', Uri.parse(url));
      request.headers.addAll(headers);
      request.body = jsonBody;
      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        setState(() async {
          String responseBody =
              await response.stream.transform(utf8.decoder).join();
          if (user != null) {
            // Name, email address, and profile photo URL
            // final y = responseBody.split(',');
            List<String> y = responseBody.split(RegExp(r'\D+'));
            final name = user.displayName;
            final email = user.email;
            String username = email.toString();
            final x = username.split("@");
            log(y[2]);
            FirebaseFirestore.instance
                .collection("students")
                .doc(x[0])
                .update({'video_score': y[1], 'audio_score': y[2]});
          }

          _status = 'Video uploaded successfully!';

          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => MyWidget()),
          );
        });
      } else {
        setState(() {
          _status = 'Error while uploading video: ${response.reasonPhrase}';
        });
      }
    } catch (e) {
      setState(() {
        _status = 'Error while uploading video: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Upload Video',
        home: Scaffold(
          backgroundColor: Color(0xFF191825),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SizedBox(
                  height: 50, //height of button
                  width: 200, //width of button equal to parent widget
                  child: ElevatedButton(
                    onPressed: () async {
                      await _selectVideo();
                    },
                    style: ElevatedButton.styleFrom(
                      primary:
                          Color.fromARGB(255, 134, 93, 255), // Background color
                      onPrimary: Colors.white,
                      // Text Color (Foreground color)
                    ),
                    child: Text(
                      'Select Video',
                      style: TextStyle(
                        fontSize: 24, // change font size here
                        color: Colors.white, // change text color here
                      ),
                    ),
                  ),
                ),
                if (_videoBytes != null && _videoFileName != null) ...[
                  SizedBox(height: 20),
                  Text(
                    'Selected video: ${_videoFileName!}',
                    style: TextStyle(
                      fontSize: 24, // change font size here
                      color: Colors.white, // change text color here
                    ),
                  ),
                  SizedBox(height: 25, width: 50),
                  SizedBox(
                    height: 50, //height of button
                    width: 200, //width of button equal to parent widget
                    child: ElevatedButton(
                      onPressed: () async {
                        await _uploadVideo();
                      },
                      style: ElevatedButton.styleFrom(
                        primary: Color.fromARGB(
                            255, 134, 93, 255), // Background color
                        onPrimary:
                            Colors.white, // Text Color (Foreground color)
                      ),
                      child: Text('Upload Video'),
                    ),
                  ),
                  SizedBox(height: 20),
                ],
                Text(_status,
                    style: TextStyle(
                        fontSize: 24, // change font size here
                        color: Colors.white)),
              ],
            ),
          ),
        ));
  }
}
