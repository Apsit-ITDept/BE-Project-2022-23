import 'package:flutter/material.dart';
import 'Tic.dart';
import 'chess.dart';
import 'mentoring.dart';

void main() => runApp(GameSelect());

class GameSelect extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Games',
      home: Scaffold(
        backgroundColor: Color(0xFF191825),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              SizedBox(
                width: 200,
                height: 100.0,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => TicTac()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    primary:
                        Color.fromARGB(255, 134, 93, 255), // Background color
                    onPrimary: Colors.white, // Text Color (Foreground color)
                  ),
                  child: const Text(
                    'Tic Tac Toe',
                    style: TextStyle(fontSize: 24),
                  ),
                ),
              ),
              SizedBox(height: 50.0),
              SizedBox(
                width: 200,
                height: 100.0,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => Mentoring()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    primary:
                        Color.fromARGB(255, 134, 93, 255), // Background color
                    onPrimary: Colors.white, // Text Color (Foreground color)
                  ),
                  child: const Text(
                    'mentoring',
                    style: TextStyle(fontSize: 24),
                  ),
                ),
              ),
              SizedBox(height: 50.0),
              SizedBox(
                width: 200,
                height: 100.0,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => HomePage()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    primary:
                        Color.fromARGB(255, 134, 93, 255), // Background color
                    onPrimary: Colors.white, // Text Color (Foreground color)
                  ),
                  child: const Text(
                    'Chess',
                    style: TextStyle(fontSize: 24),
                  ),
                ),
              ),
              // Padding(
              //   padding: const EdgeInsets.all(8.0),
              //   child: ElevatedButton(
              //     child: Text('Chess'),
              //     onPressed: () {
              //       Navigator.push(
              //         context,
              //         MaterialPageRoute(builder: (context) => HomePage()),
              //       );
              //     },
              //   ),
              // ),
            ],
          ),
        ),
      ),
    );
  }
}
