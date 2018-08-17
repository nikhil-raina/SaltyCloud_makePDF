function setUpEvents() {
    /**
     * By going to the 'inspect elements' category of the Reports side of the website, I believe that the
     * main part of the entire page, that contains all the information, the graphs and the further details
     * all of it comes under the ID=content. Therefore I have already predefined it here with my program to make
     * it a little easier.
     */
    let content = document.getElementById("content");
    let button = document.getElementById("show-more");

    /**
     * This action button is to mainly show the "scrolling down" or the expanding
     * of the text. Just like the way it shows for the ORG_UNIT_QUESTIONS.
     *
     * The transition time for the "opening" and "closing" is about 0.5s, which is mentioned on the Style Sheet
     * that you can also view just to get clarity on its functioning.
     */
    button.onclick = function () {
        if(content.className === "open"){
            content.className = "";
            button.innerText = "Show More";
        }
        else {
            // expand
            content.className = "open";
            button.innerText = "Show Less";
        }

        timeLoop();
    };
}
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
         *          ...drawDOM($("#content")).then(...)
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
 */
window.onload = function () {
    setUpEvents();
};