import { media, progress_bar } from "./html_elements"

export default function {
    elemens.media.addEventListener('londedmetadata', () {
        progress_bar.max = 100;
        progress_bar.value = 0;
        if(play_btn.classList.contains("pause")){
            media.play();
        }
    }
}