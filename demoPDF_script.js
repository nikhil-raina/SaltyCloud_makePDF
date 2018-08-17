function setUpEvents() {
    /**
     * By going to the 'inspect elements' category of the Reports side of the website, I believe that the
     * main part of the entire page, that contains all the information, the graphs and the further details
     * all of it comes under the ID=content. Therefore I have already predefined it here with my program to make
     * it a little easier.
     *
     * To allow the "expanding" method of each specific ORG_UNIT_QUESTION, you are essentially creating the:
     *      'ReportQuestionCategoryView', in which you have the 'toggleCategoryDisplay' that allows the "expanding" and
     *          "shrinking" of the entire unit_question.
     *
     *          Over there you are essentially taking the object of the document with the targeted class and performing
     *          the action.
     *          In this case there is only one label, but what I was thinking, since the categories are in the:
     *              <div> tag class=categories-panel pull-right
     *
     *          what I was thinking is that under this class, find out the number of all the categories. This could be
     *          done by:
     *              let totalNumber = $("class name").length;
     *
     *          This line of code would get you the number of categories. The similar concept could be used to identify
     *          the number of questions in each category, which would be really important when you would be setting up
     *          the TIME LIMIT, which you will come across later on in the File.
     *
     *          But yeah, then by probably running a loop, you could open up each category since you already have the
     *          number of categories or you could do it simultaneously, if there is a code for that.
     */
    let content = document.getElementById("content");
    let button = document.getElementById("show-more");

    /**
     * This action button is to mainly show the "scrolling down" or the expanding
     * of the text. Just like the way it shows for the ORG_UNIT_QUESTIONS.
     *
     * The transition time for the "opening" and "closing" is about 0.5s, which is mentioned on the Style Sheet
     * that you can also view just to get clarity on its functioning.
     *
     * This is essentially where the lines of code:
     *      $(evt.target).removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
     *                                          and
     *      $(evt.target).removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
     *
     *   Is being used. So you could implement that same method while "expanding" all the categories.
     *
     *   The only problem is that, since the PDF is not made separately and instead it is being generated from the file
     *   itself, all the "expanding" would be occurring when the button "Print PDF" or something like that, has been
     *   pressed. As after all, a PDF is pretty much like a 'screenshot' of the required data, but just in a more of a
     *   raw like format.
     *   My initial approach was to make the PDF right from scratch, with would have prevented the all the animation to
     *   show, but that was highly complicated and extremely time inefficient as all the data had to be re-modelled.
     */
    button.onclick = function () {
        if(content.className === "open"){
            // shrink
            content.className = "";
            button.innerText = "Show More";
        }
        else {
            // expand
            content.className = "open";
            button.innerText = "Show Less";
        }

        /**
         * Function call specifically for the PDF creation.
         */
        timeLoop();
    };
}

/**
 * Function that is mainly responsible for the PDF creation. Calls a nested function in itself while ensuring that a
 * specific amount of "TIME LIMIT" has been surpassed.
 *
 * The TIME LIMIT is extremely crucial.
 */
function timeLoop(){
    setTimeout(function () {

        /**
         * I added this alert to avoid the awkwardness of the "wait" feeling.
         * You will get a better understanding of this when you will reach the TIME LIMIT section.
         */
        alert("An Executive PDF will be generated.");

        /**
         * By going to the 'inspect elements' category of the Reports side of the website, I believe that the
         * main part of the entire page, that contains all the information, the graphs and the further details
         * all of it comes under the ID=content. Therefore I have already predefined it here with my program to make
         * it a little easier.
         *
         * This part of the code is essentially taking all the information that is in the (content) ID- tag and
         * making that into a a PDF.
         *
         * In order for this to work for the execution of the ISORA program, you might have to change the line of
         * code to:
         *          ...drawDOM($("#content")).then(...){...}           #73
         *
         * Since I am not able to run the code for the ISORA code myself, I cant help you with this check, but this is
         * a small thing, so I am certain that a line of code would be fine to change.
         */

        kendo.drawing.drawDOM("#content").then(function(group) {
            kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
        });

        /**
         * This is the TIME LIMIT.
         *
         * This is probably the most IMPORTANT number in the program as based on this only would you be able to
         * get the entire PDF, which includes the "opened up" ORG_UNIT_QUESTIONS.
         *
         * So the problem with the setTimeout() is that it would go about being executed, that is the first parameter,
         * only after the set number of time has completed. According to the documentation, it says that the second
         * parameter holds the number of milliseconds, but I am fairly certain that its not that. I am not sure what the
         * timer is based on though.
         *
         * So yeah, make sure that this number is big enough to handle the "scrolling down" of the ORG_UNIT_QUESTION
         * categories to give a detailed view of of each category, otherwise not all the details will be viewed on the
         * PDF or maybe not a single extra detail will be viewed, provided that the number becomes too small.
         *
         * So in order to avoid the awkwardness of the "wait" feeling, I added an alert at the beginning of this
         * function to make it appear that "there is some background work occurring".
         *
         * The mathematical approach, at least I think could be like a start, could possibly be:
         *      Total # of Q. from all categories = x
         *      Transition effect of an individual category = k (as it would most likely remain constant)
         *
         *      Total TIME LIMIT = k*x*1000
         *
         *      Also, about 30000 is roughly 30 seconds, so in case the math is completely flawed then you could
         *      look at it more objectively as per each category and come up with a common number I guess...
         *
         */
    }, 900)
}

/**
 * Waits for the entire HTML thing to load and then
 * goes about loading the JS scripts.
 *
 * This isn't an important part of the program, but you could think of it like even if the button is pressed, to allow
 * the PDF creation to take place, it would just ensure that the entire document is completely ready before it would go
 * the execution of the PDF.
 *
 * This could possibly act like a "check" function. Something like that would check if all the categories are
 * "expanded", only then continue forward with generating the PDF. In that way, this should be getting called instead of
 * it calling the function to make the PDF.
 *
 * Again, this was just to cater to my program and the way I have coded.
 *
 * I hope that I have made it as easy as I can for you in order to implement this functionality into the Reports section
 * of the ISORA Product. If you require any further explanation, I am always available.
 *
 */
window.onload = function () {
    setUpEvents();
};