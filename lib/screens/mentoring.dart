import 'package:flutter/material.dart';

class Blog {
  final String title;
  final String content;

  Blog({required this.title, required this.content});
}

void main() {
  runApp(Mentoring());
}

class Mentoring extends StatelessWidget {
  final Blog blog = Blog(
      title: 'How to Speak in Public',
      content:
          'Speaking in public can be a daunting task, but with practice and preparation, anyone can become a confident public speaker. Here are some tips to help you improve your public speaking skills:\n\n1. Practice, Practice, Practice: The more you practice, the more comfortable you will become with your material. Practice in front of a mirror or record yourself and watch it back to identify areas for improvement.\n\n2. Know Your Audience: Tailor your speech to your audience. Consider their age, background, and interests when preparing your speech.\n\n3. Use Visual Aids: Visual aids can help reinforce your message and keep your audience engaged. Consider using props, charts, or slides to enhance your presentation.\n\n4. Speak Slowly and Clearly: Speak at a moderate pace and enunciate your words clearly. This will help your audience follow your message and understand your points.\n\n5. Engage Your Audience: Ask questions, tell stories, and make eye contact with your audience. This will help you connect with them and keep them interested in your message.\n\nWith these tips and some practice, you can become a confident and effective public speaker!');

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Mentoring',
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Color(0xff191825),
          title: Text(blog.title),
        ),
        body: Container(
          padding: EdgeInsets.symmetric(horizontal: 16),
          color: Color(0xff191825),
          child: Center(
            child: Text(
              blog.content,
              style: TextStyle(
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
