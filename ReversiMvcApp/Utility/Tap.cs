using System;

namespace ReversiMvcApp.Utility
{
    public class Tap
    {
        /// <summary>
        /// Capture an instance of object and apply callback to it, return the resulting instance
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="fn"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static T Capture<T>(T obj, Action<T> fn)
        {
            fn(obj);
            return obj;
        }

    }
}