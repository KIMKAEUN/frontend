"use client";

import TemplateHeader from "@/components/template/TemplateHeader";
import TemplateItem from "@/components/template/TemplateItem";
import TemplateList from "@/components/template/TemplateList";
import { getTemplateAll } from "@/lib/api/templateAPI";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export interface Data {
  title: string;
  id: number;
  description: string;
  hashtags: string[];
  thumbnailUrl?: null;
}

const TemplatePage = () => {
  // State
  const [category, setCategory] = useState("/template");
  const [tab, setTab] = useState("/template");
  const onSelect = useCallback((category: string) => setCategory(category), []);
  const onSelectTab = useCallback((tabItem: string) => setTab(tabItem), []);
  const [scroll, setScroll] = useState(false);
  const [allData, setAllData] = useState([]);

  // search test
  const [keyword, setKeyword] = useState("");

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, []);

  // Function
  const onScroll = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const fetchTempAllData = useCallback(async () => {
    await getTemplateAll().then((res) => {
      console.log("템플릿 모음:", res.data.content);
      setAllData(res.data.content);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    fetchTempAllData();
    return () => {
      fetchTempAllData();
    };
  }, [fetchTempAllData]);

  // Render
  return (
    <>
      <TemplateHeader
        tab={tab}
        keyword={keyword}
        onSearchChange={onSearchChange}
        scroll={scroll}
        onSelectTab={onSelectTab}
        category={category}
        onSelect={onSelect}
      />
      <TemplateList>
        {allData.map((item: Data) => (
          <TemplateItem
            key={item.id}
            title={item.title}
            description={item.description}
            hashtags={item.hashtags}
            id={item.id}
          />
        ))}
      </TemplateList>
    </>
  );
};

export default TemplatePage;
