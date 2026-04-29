"use client";

import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

CustomEase.create("nex-smooth", "0.18,0.84,0.24,1");
CustomEase.create("nex-sweep", "0.62,0.05,0.01,0.99");

export {CustomEase, ScrollTrigger, SplitText, gsap, useGSAP};
