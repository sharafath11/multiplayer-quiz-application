import { Qz } from "../../asset/quiz.js";
import jwt from "jsonwebtoken"
import userModel from "../../models/userModel.js";
export const randomQz = async (req, res) => {
  try {
    const { level, cat } = req.body;
    console.log(req.body);
    
    let filteredQuestions = cat && cat !== ":null" 
      ? Qz.filter((q) => q.category === cat) 
      : Qz;
    if (level > 10) {
      filteredQuestions = filteredQuestions.filter(
        (q) => q.difficulty === 'medium' || q.difficulty === 'hard'
      );
    }
    if (!filteredQuestions.length) {
      return res.status(404).json({ success: false, message: "No questions found" });
    }
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
    }
    const questionsToSend = filteredQuestions.slice(0, 20);
    console.log(questionsToSend)
    res.status(200).json({ success: true, questions: questionsToSend });
  } catch (error) {
    console.error("Error in randomQz:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



export const submitQuiz = async (req, res) => {
  const { score, token,numberOfQuestions} = req.body;
  
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decoded.userId; 
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.quizHistory.push({
      score,
      attemptedAt: new Date(),
    });
    const passingScore = numberOfQuestions * 0.50;
    
   
    if(score>passingScore){  
       
      user.level = user.level+1;
    }
    user.correctAnswer=user.correctAnswer+score
    user.wrongAnswer=user.wrongAnswer+(numberOfQuestions-score)
    

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Quiz result updated successfully',
      user
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
