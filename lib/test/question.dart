class Question {
  final String questionText;
  final List<Answer> answersList;

  Question(this.questionText, this.answersList);
}

class Answer {
  final String answerText;
  final bool isCorrect;

  Answer(this.answerText, this.isCorrect);
}

List<Question> getQuestions() {
  List<Question> list = [];
  //ADD questions and answer here

  list.add(Question(
    "What _______ when I called?",
    [
      Answer("Was you doing", false),
      Answer("You were doing", false),
      Answer("Were you doing", true),
      Answer("Was you do", false),
    ],
  ));

  list.add(Question(
    "You can use my car ______ tomorrow.",
    [
      Answer("Around", false),
      Answer("Since", false),
      Answer("Yet", false),
      Answer("Until", true),
    ],
  ));

  list.add(Question(
    "What _______ your favorite food as a child?",
    [
      Answer("Will", false),
      Answer("Would", false),
      Answer("Is", false),
      Answer("Were", true),
    ],
  ));

  list.add(Question(
    "__________? Adolph Hitler did.",
    [
      Answer("Who start World War II", false),
      Answer("Who started the Second World War", true),
      Answer("Who caused World War II", false),
      Answer("Who did World War II", false),
    ],
  ));

  list.add(Question(
    "The Quantum theory was initially regarded as absurd , unnatural and ____ it with common sense.",
    [
      Answer("consanguineous", false),
      Answer("incompatible ", true),
      Answer("discernible ", false),
      Answer("decipherable", false),
    ],
  ));

  return list;
}
