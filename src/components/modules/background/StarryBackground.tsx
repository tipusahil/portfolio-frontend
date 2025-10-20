
'use client'; // এই কম্পোনেন্ট ক্লায়েন্ট-সাইডে রান করবে, কারণ ক্যানভাস অ্যানিমেশন ব্রাউজারে কাজ করে

import { useEffect, useRef } from 'react'; // React থেকে useEffect এবং useRef হুক আমদানি করা হচ্ছে

// Star ক্লাসের টাইপ ডিফিনেশন: প্রতিটি তারার প্রোপার্টি এবং মেথডের টাইপ নির্ধারণ
// interface Star {
//   x: number; // তারার X-কোঅর্ডিনেট
//   y: number; // তারার Y-কোঅর্ডিনেট
//   radius: number; // তারার ব্যাসার্ধ
//   vx: number; // X-অক্ষে তারার ভেলোসিটি
//   vy: number; // Y-অক্ষে তারার ভেলোসিটি
//   opacity: number; // তারার অপাসিটি (ফোকাসের বাইরে থাকার জন্য)
//   draw: () => void; // তারা আঁকার মেথড
//   update: () => void; // তারার পজিশন এবং অ্যানিমেশন আপডেটের মেথড
// }

// প্রপসের টাইপ ডিফিনেশন: কম্পোনেন্টে children প্রপ পাস করা হবে
interface StarryBackgroundProps {
  children: React.ReactNode; // children হিসেবে যেকোনো React কনটেন্ট পাস করা যাবে
}

// StarryBackground কম্পোনেন্ট: স্টারি ব্যাকগ্রাউন্ড তৈরি করে
export default function StarryBackground({ children }: StarryBackgroundProps) {
  // ক্যানভাস এলিমেন্টের রেফারেন্স সংরক্ষণের জন্য useRef ব্যবহার
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect হুক: কম্পোনেন্ট মাউন্ট হলে এবং আনমাউন্ট হলে কোড রান করবে
  useEffect(() => {
    // ক্যানভাস এলিমেন্ট পাওয়া
    const canvas = canvasRef.current;
    if (!canvas) return; // যদি ক্যানভাস না পাওয়া যায়, ফাংশন থেকে বেরিয়ে যাও
    const ctx = canvas.getContext('2d'); // ক্যানভাসের 2D রেন্ডারিং কনটেক্সট
    if (!ctx) return; // যদি কনটেক্সট না পাওয়া যায়, ফাংশন থেকে বেরিয়ে যাও

    // ক্যানভাসের সাইজ সেট করা: ব্রাউজার উইন্ডোর পুরো সাইজ নেবে
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // উইন্ডো রিসাইজ হলে ক্যানভাসের সাইজ আপডেট করার ফাংশন
    const handleResize = () => {
      canvas!.width = window.innerWidth; // ক্যানভাসের প্রস্থ আপডেট
      canvas!.height = window.innerHeight; // ক্যানভাসের উচ্চতা আপডেট
    };
    window.addEventListener('resize', handleResize); // রিসাইজ ইভেন্ট লিসেনার যোগ

    // তারার ক্লাস: প্রতিটি তারার বৈশিষ্ট্য এবং আচরণ নির্ধারণ
    class Star implements Star {
      x: number; // তারার X-কোঅর্ডিনেট
      y: number; // তারার Y-কোঅর্ডিনেট
      radius: number; // তারার ব্যাসার্ধ
      vx: number; // X-অক্ষে ভেলোসিটি
      vy: number; // Y-অক্ষে ভেলোসিটি
      opacity: number; // তারার অপাসিটি

      constructor() {
        // র‍্যান্ডম পজিশন এবং বৈশিষ্ট্য সেট করা
        this.x = Math.random() * canvas!.width; // র‍্যান্ডম X পজিশন (ক্যানভাসের প্রস্থের মধ্যে)
        this.y = Math.random() * canvas!.height; // র‍্যান্ডম Y পজিশন (ক্যানভাসের উচ্চতার মধ্যে)
        this.radius = Math.random() * 1.5 + 0.5; // র‍্যান্ডম ব্যাসার্ধ (0.5 থেকে 2 পিক্সেল)
        // কাস্টমাইজেশন: বড় তারার জন্য 1.5 বাড়িয়ে 2 বা 3 করতে পারো
        this.vx = (Math.random() - 0.5) * 0.5; // র‍্যান্ডম X-ভেলোসিটি (-0.25 থেকে 0.25)
        this.vy = (Math.random() - 0.5) * 0.5; // র‍্যান্ডম Y-ভেলোসিটি (-0.25 থেকে 0.25)
        // কাস্টমাইজেশন: গতি কমাতে 0.5 কে 0.3 বা 0.2 করতে পারো
        this.opacity = Math.random() * 0.5 + 0.3; // র‍্যান্ডম অপাসিটি (0.3 থেকে 0.8)
        // কাস্টমাইজেশন: অপাসিটি বাড়াতে/কমাতে 0.3 এবং 0.5 পরিবর্তন করো
      }

      // তারা আঁকার মেথড
      draw() {
        ctx!.beginPath(); // নতুন পাথ শুরু
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // বৃত্ত আঁকা (তারা)
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // সাদা রঙ, অপাসিটি সহ
        // কাস্টমাইজেশন: রঙ পরিবর্তন করতে rgba(200, 200, 255, ${this.opacity}) দিয়ে নীলাভ করতে পারো
        ctx!.fill(); // বৃত্ত ভরাট করা
        ctx!.closePath(); // পাথ বন্ধ করা
      }

      // তারার পজিশন এবং অ্যানিমেশন আপডেট
      update() {
        this.x += this.vx; // X পজিশন আপডেট
        this.y += this.vy; // Y পজিশন আপডেট

        // ক্যানভাসের প্রান্তে পৌঁছালে বাউন্স করা
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1; // X-ভেলোসিটি উল্টানো
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1; // Y-ভেলোসিটি উল্টানো

        // মসৃণ চলার জন্য র‍্যান্ডম ভেলোসিটি অ্যাডজাস্ট
        this.vx += (Math.random() - 0.5) * 0.05; // X-ভেলোসিটিতে সামান্য পরিবর্তন
        this.vy += (Math.random() - 0.5) * 0.05; // Y-ভেলোসিটিতে সামান্য পরিবর্তন
        // কাস্টমাইজেশন: 0.05 কমিয়ে (যেমন 0.02) মুভমেন্ট আরো মসৃণ করতে পারো

        // ভেলোসিটি সীমিত করা যাতে তারা খুব দ্রুত না যায়
        this.vx = Math.max(Math.min(this.vx, 0.5), -0.5); // X-ভেলোসিটি -0.5 থেকে 0.5 এর মধ্যে
        this.vy = Math.max(Math.min(this.vy, 0.5), -0.5); // Y-ভেলোসিটি -0.5 থেকে 0.5 এর মধ্যে
        // কাস্টমাইজেশন: সীমা কমাতে (যেমন 0.3) গতি ধীর করতে পারো

        this.draw(); // তারা আঁকা
      }
    }

    // তারার অ্যারে তৈরি
    const stars: Star[] = []; // Star টাইপের অ্যারে
    const numStars = 100; // তারার সংখ্যা
    // কাস্টমাইজেশন: আরো তারার জন্য numStars বাড়াও (যেমন 200), কম তারার জন্য কমাও (যেমন 50)
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star()); // নতুন তারা তৈরি করে অ্যারেতে যোগ
    }

    // অ্যানিমেশন লুপ: প্রতি ফ্রেমে ক্যানভাস আপডেট করে
    let animationFrameId: number; // requestAnimationFrame এর ID সংরক্ষণ
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height); // ক্যানভাস ক্লিয়ার করা
      stars.forEach(star => star.update()); // প্রতিটি তারা আপডেট
      animationFrameId = requestAnimationFrame(animate); // পরবর্তী ফ্রেমের জন্য অ্যানিমেশন কল
    }

    animate(); // অ্যানিমেশন শুরু

    // ক্লিনআপ: কম্পোনেন্ট আনমাউন্ট হলে ইভেন্ট এবং অ্যানিমেশন বন্ধ
    return () => {
      window.removeEventListener('resize', handleResize); // রিসাইজ লিসেনার সরানো
      cancelAnimationFrame(animationFrameId); // অ্যানিমেশন বন্ধ
    };
  }, []); // খালি ডিপেন্ডেন্সি অ্যারে: শুধু মাউন্ট/আনমাউন্টে রান করবে

  // JSX রিটার্ন: ব্যাকগ্রাউন্ড এবং কনটেন্ট রেন্ডার
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#1A1A3D] to-[#2E2E5A]">
      {/* ব্যাকগ্রাউন্ড: পুরো স্ক্রিন কভার করে, গ্রেডিয়েন্ট নীল */}
      {/* কাস্টমাইজেশন: গ্রেডিয়েন্ট পরিবর্তন করতে from-[#112233] to-[#223344] ব্যবহার করতে পারো */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />
      {/* ক্যানভাস: তারাগুলো এখানে আঁকা হবে, z-0 দিয়ে ব্যাকগ্রাউন্ডে রাখা */}
      <div className="relative z-10">{children}</div>
      {/* কনটেন্ট: children এর মাধ্যমে পাস করা কনটেন্ট z-10 দিয়ে সামনে রাখা */}
    </div>
  );
}
