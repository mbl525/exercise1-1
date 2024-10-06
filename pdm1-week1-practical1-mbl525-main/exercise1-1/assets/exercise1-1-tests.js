import { checkCanvasSize, checkBackground, 
    getShapes, TestResults, advanceToFrame, CIRCLE } from "../../lib/test-utils.js";
/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const coords = [];
    for (let i = 1; i <= 100; i++) {
        advanceToFrame(frameCount + 1);
        coords.push({x: mouseX, y: mouseY});
        mouseX += 5;
        if (mouseY === 0) {
            mouseY = 1;
        }
        mouseY *= 1.1;
        
    }
    checkCanvasSize(600, 400);
    checkBackground(color(0), "black");
    const actual = getShapes();
    const actualCircles = actual.filter(s => s.type === CIRCLE);
    if (actual.length === 100 && actualCircles.length === 100) {
        TestResults.addPass("The sketch contains 100 circles.");
    } else {
        TestResults.addFail(`Expected 100 circles, found ${actualCircles.length}.`);
    }
    checkFade(actual, mouseX, mouseY);
    checkCirclesFollowMouse(actual, coords);
    const resultsDiv = document.getElementById("results");
    TestResults.display(resultsDiv);
}

function checkFade(actual) {
    if (actual.length > 1) {
        let lastAlpha = alpha(actual[0].fillColour);
        let pass = true;
        for (let i = 1; i < actual.length ; i++) {
            const nextAlpha = alpha(actual[i].fillColour);
            if (nextAlpha <= lastAlpha) {
                TestResults.addFail("Found at least one shape that has an alpha value greater than or equal to the shape drawn before it.");
                pass = false;
                break;
            }
            lastAlpha = nextAlpha;
        }
        if (pass) {
            TestResults.addPass("The fill fades from newest to oldest shape as expected.");
        }
    }
}

function checkCirclesFollowMouse(actual, expectedCoords) {
    if (actual.length === expectedCoords.length) {
        let pass = true;
        for (let i = 0; i < actual.length; i++) {
            if (actual[i].x !== expectedCoords[i].x || actual[i].y !== expectedCoords[i].y) {
                pass = false;
                TestResults.addFail("The shapes do not appear to be following the mouse coordinates as expected. Check that you are storing <code>mouseX</code> and <code>mouseY</code> every time <code>draw()</code> is called and check that the last shape drawn is at the most recent mouse coordinate.");
                break;
            }
        }
        if (pass) {
            TestResults.addPass("The shapes are following the mouse coordinates as expected.");
        }
    }
}


const loadTimer = setInterval(waitForP5, 500);