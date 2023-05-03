import 'package:flutter/material.dart';
import 'package:flutter_chess_board/flutter_chess_board.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  ChessBoardController controller = ChessBoardController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        // set background color here
        child: Center(
          child: ChessBoard(
            controller: controller,
            boardColor: BoardColor.orange,
            boardOrientation: PlayerColor.white,
          ),
        ),
      ),
    );
  }
}
