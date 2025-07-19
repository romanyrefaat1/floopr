import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// GET handler to find duplicate clusters
export async function GET(request: Request, { params }: { params: { productId: string } }) {
  try {
    const resolvedParams = await params;
    const productId = resolvedParams.productId;
    const { searchParams } = new URL(request.url);
    const similarity = searchParams.get("similarity");
    
    const snapshot = await adminDb.collection(`products/${productId}/feedbacks`).get();
    
    if (snapshot.empty) {
      return NextResponse.json({
        message: "No feedback found",
        clusters: []
      });
    }

    let clusters = [];

    if (similarity) {
      // For similarity-based clustering (you'd need to implement similarity logic)
      clusters = await findSimilarClusters(snapshot, parseInt(similarity));
    } else {
      // For exact content matching
      clusters = findIdenticalClusters(snapshot);
    }

    return NextResponse.json({
      message: `Found ${clusters.length} duplicate clusters`,
      clusters,
      totalDuplicates: clusters.reduce((sum, cluster) => sum + (cluster.length - 1), 0)
    });
    
  } catch (error) {
    console.error("Error finding duplicates:", error);
    return NextResponse.json({ 
      message: "Internal server error", 
      error: error.message 
    }, { status: 500 });
  }
}

// DELETE handler to remove duplicates with Firestore batch
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const productId = resolvedParams.productId;
    const body = await request.json();
    const { clusters } = body;
    
    if (!clusters || clusters.length === 0) {
      return NextResponse.json({ 
        message: "No clusters provided for deletion",
        deleted: []
      });
    }

    const batch = adminDb.batch();
    const deletedIds = [];

    // clusters should be an array of arrays containing document IDs to delete
    // e.g., [["id1", "id2"], ["id3", "id4", "id5"]]
    for (const cluster of clusters) {
      for (const docId of cluster) {
        const docRef = adminDb.doc(`products/${productId}/feedbacks/${docId}`);
        batch.delete(docRef);
        deletedIds.push(docId);
      }
    }

    await batch.commit();

    return NextResponse.json({
      message: `Successfully deleted ${deletedIds.length} duplicate feedback items`,
      deleted: deletedIds,
      clustersProcessed: clusters.length
    });
    
  } catch (error) {
    console.error("Error deleting duplicates:", error);
    return NextResponse.json({ 
      message: "Internal server error", 
      error: error.message 
    }, { status: 500 });
  }
}

// Helper function to extract text content from feedback data
function extractTextContent(data) {
  console.log("📝 Processing feedback data:", { 
    hasContent: !!data.content, 
    hasInputs: !!data.inputs,
    hasFeedback: !!data.feedback,
    feedbackType: typeof data.feedback,
    inputsType: Array.isArray(data.inputs) ? 'array' : typeof data.inputs,
    inputsLength: Array.isArray(data.inputs) ? data.inputs.length : 'N/A'
  });
  
  // Check content first
  if (data.content?.trim()) {
    const content = data.content.trim();
    console.log("✅ Found content:", content);
    return content;
  }
  
  // Check if feedback object has content or inputs
  if (data.feedback && typeof data.feedback === 'object') {
    console.log("🔍 Checking feedback object:", data.feedback);
    
    // Check feedback.content
    if (data.feedback.content?.trim()) {
      const content = data.feedback.content.trim();
      console.log("✅ Found feedback.content:", content);
      return content;
    }
    
    // Check feedback.inputs array
    if (data.feedback.inputs && Array.isArray(data.feedback.inputs)) {
      console.log("🔍 Checking feedback.inputs array:", data.feedback.inputs);
      
      const validInputs = data.feedback.inputs.filter(input => {
        const isValid = input && typeof input === 'object' && input.value;
        console.log("  Input validation:", { input, isValid });
        return isValid;
      });
      
      const inputValues = validInputs
        .map(input => {
          const trimmed = input.value.trim();
          console.log("  Extracted value:", trimmed);
          return trimmed;
        })
        .filter(value => {
          const hasLength = value.length > 0;
          console.log("  Value length check:", { value, hasLength });
          return hasLength;
        });
      
      const joined = inputValues.join(' ');
      console.log("🔗 Joined input values:", joined);
      
      if (joined) {
        console.log("✅ Using feedback.inputs content:", joined);
        return joined;
      }
    }
  }
  
  // If no content, check inputs array at root level
  if (data.inputs && Array.isArray(data.inputs)) {
    console.log("🔍 Checking root inputs array:", data.inputs);
    
    const validInputs = data.inputs.filter(input => {
      const isValid = input && typeof input === 'object' && input.value;
      console.log("  Input validation:", { input, isValid });
      return isValid;
    });
    
    const inputValues = validInputs
      .map(input => {
        const trimmed = input.value.trim();
        console.log("  Extracted value:", trimmed);
        return trimmed;
      })
      .filter(value => {
        const hasLength = value.length > 0;
        console.log("  Value length check:", { value, hasLength });
        return hasLength;
      });
    
    const joined = inputValues.join(' ');
    console.log("🔗 Joined input values:", joined);
    
    if (joined) {
      console.log("✅ Using root inputs content:", joined);
      return joined;
    }
  }
  
  console.log("❌ No text content found");
  return null; // No text content found
}

// Helper function to find identical content clusters
function findIdenticalClusters(snapshot) {
  console.log("🚀 Starting findIdenticalClusters...");
  console.log("📊 Total documents in snapshot:", snapshot.size);
  
  const contentMap = {};
  let processedCount = 0;
  let skippedCount = 0;
  
  // Group documents by identical content
  snapshot.forEach(doc => {
    processedCount++;
    console.log(`\n--- Processing document ${processedCount}/${snapshot.size} ---`);
    console.log("📄 Document ID:", doc.id);
    
    const data = doc.data();
    console.log("📋 Document data keys:", Object.keys(data));
    
    const content = extractTextContent(data);
    
    if (!content) {
      skippedCount++;
      console.log("⏭️ Skipped - no text content found");
      return;
    }
    
    console.log("🔑 Content key for mapping:", `"${content}"`);
    
    if (!contentMap[content]) {
      contentMap[content] = [];
      console.log("🆕 Created new content group");
    } else {
      console.log("👥 Adding to existing group (current size:", contentMap[content].length, ")");
    }
    
    contentMap[content].push({
      id: doc.id,
      data: data
    });
  });

  console.log(`\n📈 Processing summary:`);
  console.log(`  - Total processed: ${processedCount}`);
  console.log(`  - Skipped (no content): ${skippedCount}`);
  console.log(`  - Unique content groups: ${Object.keys(contentMap).length}`);

  // Log content groups
  Object.entries(contentMap).forEach(([content, group], index) => {
    console.log(`\nGroup ${index + 1}: "${content}" (${group.length} items)`);
    group.forEach(item => console.log(`  - Document ID: ${item.id}`));
  });

  // Return only groups with more than 1 item (duplicates)
  const duplicateGroups = Object.values(contentMap)
    .filter(group => {
      const isDuplicate = group.length > 1;
      if (isDuplicate) {
        console.log(`🚨 Found duplicate group with ${group.length} items:`, 
          group.map(item => item.id));
      }
      return isDuplicate;
    })
    .sort((a, b) => b.length - a.length); // Sort by cluster size, largest first

  console.log(`\n🎯 Final results:`);
  console.log(`  - Duplicate groups found: ${duplicateGroups.length}`);
  console.log(`  - Total duplicates: ${duplicateGroups.reduce((sum, group) => sum + (group.length - 1), 0)}`);

  return duplicateGroups;
}

// Helper function for similarity-based clustering
async function findSimilarClusters(snapshot, similarityThreshold) {
  const feedbackItems = [];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    const content = extractTextContent(data);
    
    if (content) {
      feedbackItems.push({
        id: doc.id,
        data: data,
        content: content.toLowerCase()
      });
    }
  });

  const clusters = [];
  const processed = new Set();

  for (let i = 0; i < feedbackItems.length; i++) {
    if (processed.has(feedbackItems[i].id)) continue;

    const cluster = [feedbackItems[i]];
    processed.add(feedbackItems[i].id);

    for (let j = i + 1; j < feedbackItems.length; j++) {
      if (processed.has(feedbackItems[j].id)) continue;

      const similarity = calculateSimilarity(
        feedbackItems[i].content,
        feedbackItems[j].content
      );

      if (similarity >= similarityThreshold) {
        cluster.push(feedbackItems[j]);
        processed.add(feedbackItems[j].id);
      }
    }

    if (cluster.length > 1) {
      clusters.push(cluster);
    }
  }

  return clusters.sort((a, b) => b.length - a.length);
}

// Simple similarity calculation (you might want to use a more sophisticated algorithm)
function calculateSimilarity(str1, str2) {
  if (str1 === str2) return 100;
  
  // Simple Levenshtein distance based similarity
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 100;
  
  const distance = levenshteinDistance(longer, shorter);
  const similarity = ((longer.length - distance) / longer.length) * 100;
  
  return Math.round(similarity);
}

function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}